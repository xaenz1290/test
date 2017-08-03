import { Component, OnInit } from '@angular/core';
import { Item } from "../item";
import { User } from "../user";
import { ItemService } from "../services/item.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs/Subscription";






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscription :Subscription
  current
  item: Item = new Item();
  tagitems;
  items: Array<Item> = [];
  users: Array<User> = []
  creationErrors: string[] = [];
  userId = this.cookieService.get('userID')
  




  constructor(private itemService: ItemService,private router: Router, private authService: AuthService, private cookieService: CookieService) {
    
   }

   getUser() {
    this.authService.getUser()
    .then((user) => {
            console.log('get one', user);    
            this.current = user;
        })
  }


  getUsers() {
    this.authService.getUsers()
    .then(users => {
            console.log('getting users from the server');    
            this.users = users;
        })
        .catch(console.log)
  }

  ngOnInit() {
    this.getUser()
    this.getUsers()
    
  }



    logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']))
      .catch(() => {})
  }


  onSubmit(item: Item) {
    item.postedBy = this.userId
    console.log('item',item)
    this.itemService.addItem(item)
    .then((user) => {
      console.log(user)
      this.getUser()
    })
    .catch(response => this.handleErrors(response.json())) 

  }

  private handleErrors(errors: string[] | Error) {
    this.creationErrors = Array.isArray(errors) ? errors : [errors.message]
  }

}
