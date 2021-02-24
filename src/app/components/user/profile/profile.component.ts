import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = userService.currentUserValue;
   }

  ngOnInit() {
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

}
