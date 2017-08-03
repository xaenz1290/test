import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";



import { User } from "../user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginErrors: string

  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  


  onLogin(user: User) {
    this.auth.login(user) 
    .then((user) => {
      this.auth.updateObs(user)
      this.router.navigate(['dashboard'])
    })
      .catch(response => this.loginErrors = response._body)  
    
  }

  

  
  




}
