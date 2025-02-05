import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Toaster } from 'src/app/models/toaster';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Toaster{
  
  loginForm = this.fb.group({
    correo: ['', [Validators.email, Validators.required]],
    contrasena: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(private loginService: LoginService, private fb: FormBuilder, private router:Router) {
    super();
  }

  getMode(): boolean {
    let mode = false;
    this.loginService.getMode().subscribe({
      next: (value) => {
        mode = value;
      },
    });
    return mode;
  }

  get correo() {
    return this.loginForm.controls.correo;
  }

  get contrasena() {
    return this.loginForm.controls.contrasena;
  }

  submit() {
    if(this.loginForm.valid){
      this.isLoading = true;
      const login = this.loginForm.value as Login;
      this.loginService.signIn(login).subscribe({
        next:(value)=>{     
          this.loginService.setIsLoggedIn(value.status);     
          if(value.status){            
            this.router.navigateByUrl('/home');
          }else{
            this.dialog(value.message);
          }
        },
        complete:()=>{
          this.isLoading = false;
        },
      });
    }
  }

  reset(){
    this.loginForm.reset();
    this.close();
  }
}
