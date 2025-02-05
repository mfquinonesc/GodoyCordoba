import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  mode: boolean = false;

  constructor(private loginServise: LoginService, private router:Router) {}

  get isLoggedIn():boolean{
    let resp = false;
    this.loginServise.getIsLoggedIn().subscribe({
      next:(value)=>{
        resp = value;
      },
    });
    return resp;
  }

  regist() {
    this.loginServise.regist();
    this.mode = !this.mode;
  }

  login() {
    this.loginServise.login();
    this.mode = !this.mode;
  } 

  logOut(){
    this.loginServise.setIsLoggedIn(false);
    this.router.navigateByUrl('');
  }

}
