import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Toaster } from 'src/app/models/toaster';
import { Usuario } from 'src/app/models/usuario';
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
          if(value.status){ 
            const user = value.user as Usuario;
            const token = value.token as string;
            this.loginService.setSession(user);
            this.loginService.setToken(token);         
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
