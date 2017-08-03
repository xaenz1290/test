import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { User } from '../user'
import { Item } from "../item";
import { AuthService } from '../services/auth.service'
import { ItemService } from "../services/item.service";
import { CookieService } from "ngx-cookie";




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
   user: User;
   errors;
   item = new Item()
    
  userId = this.cookieService.get('userID')


  subscription :Subscription

  constructor(private cookieService: CookieService, private itemService: ItemService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }



  getUser() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.authService.getOne(param.get('id'))
      )
      .subscribe((user) => {
        console.log(user)
        this.user = user
        
      });
  }

  onSubmit(form) {
    console.log(form)
    this.itemService.updateItem(form)
    .then((item) => this.router.navigate(['/dashboard']))
    .catch(response => this.handleErrors(response.json()))
  }

 

  ngOnInit() {
    this.getUser()

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleErrors(errors: string[] | Error) {
    this.errors = Array.isArray(errors) ? errors : [errors.message]
  }

}
