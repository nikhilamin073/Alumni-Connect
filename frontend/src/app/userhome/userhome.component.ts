import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  


  uname:String='--not added--';
  title:String="--not added--"
  content:String="--not added--"
  creation_dt:String="--not added--"
  
  postForm:FormGroup = new FormGroup({
    uname:new FormControl(null,Validators.required),
    title:new FormControl(null,Validators.required),
    content:new FormControl(null,Validators.required)
  })

  username:String='';
  constructor(private _userService:UserService, private _router:Router, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this._userService.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }
  // showSuccess() {
  //   this.toastr.success('Post Updated');
  // }

  addName(data){
    this.username = data.username;
  }
  ngOnInit() {
    this.refreshPostList();
  }

  refreshPostList() {
    this._userService.getPosts().subscribe((res) => {
      this._userService.posts = res as Post[];
    });
  }

  createPost(){
    
    if(!this.postForm.valid){
      console.log('Invalid Form'); return;
    }
    this.toastr.success('Post Updated');
    this._userService.post(JSON.stringify(this.postForm.value))
    .subscribe(
      data=> {console.log(data); this.refreshPostList();},
      error=>console.error(error)
    )
  }


}
