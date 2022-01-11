import { Component, OnInit } from '@angular/core';
import { User } from "../../classes/user";
import { UserService } from "../../services/user-service/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(public userService: UserService) {
    this.userService.users.subscribe(e => {
      this.users = e;
    })
  }

  ngOnInit(): void {
  }

}
