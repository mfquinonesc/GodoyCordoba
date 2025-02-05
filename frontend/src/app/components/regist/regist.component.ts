import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toaster } from 'src/app/models/toaster';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent extends Toaster implements OnInit{
 
  registForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    cedula:[0,[Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.email, Validators.required]],
    contrasena: ['', [Validators.minLength(8), Validators.required]],
    confirm: ['',[Validators.minLength(8), Validators.required]]
  });

  @Input() isCreating:boolean = true;
 
  @Input() usuario:Usuario = {} as Usuario;

  @Output() onClose = new EventEmitter<boolean>(false);
  @Output() onUpdate = new EventEmitter<boolean>(false);
  @Output() onCreate = new EventEmitter<boolean>(false);

  constructor(private loginService: LoginService, private fb: FormBuilder, private router:Router, private userService: UserService) {
    super();   
  }

  ngOnInit(): void {      

    if(!this.isCreating && this.usuario && this.usuario.usuarioId){
      this.registForm.patchValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        correo: this.usuario.correo,
        cedula: this.usuario.cedula
      });
    }
  }
 
  get correo() {
    return this.registForm.controls.correo;
  }

  get contrasena() {
    return this.registForm.controls.contrasena;
  }

  get cedula(){
    return this.registForm.controls.cedula;
  }

  get nombre() {
    return this.registForm.controls.nombre;
  }

  get apellido() {
    return this.registForm.controls.apellido;
  }

  get confirm(){
    return this.registForm.controls.confirm;
  }

  get isValidToCreate(){
    return this.registForm.valid && (this.confirm.value == this.contrasena.value);
  }

  get isValidToUpdate(){
    return this.nombre.valid && this.apellido.valid && this.cedula.valid && this.correo.valid;
  }

  submit() {
    this.isLoading = true;
    if(this.isCreating){
      this.create();
    }else{
      this.edit();
    }
  }

  create(){
    if(this.isValidToCreate){    
      const user = this.registForm.value as unknown as Usuario;
      this.loginService.signUp(user).subscribe({
        next:(value)=>{    
          if(value.status){
            this.onCreate.emit(true);
            this.router.navigateByUrl('/home'); 
          }else{
            this.dialog(value.message);
          }
        },
        complete:()=>{
          this.isLoading = false;
        },
      })
    }
  }

  edit(){    
    if(this.isValidToUpdate){
      const user = this.registForm.value as unknown as Usuario;
      this.userService.update(this.usuario!.usuarioId!,user).subscribe({
        next:(value)=>{
          this.onUpdate.emit(true);
          this.registForm.reset();
          this.close();
        },
        complete:()=>{
          this.isLoading = false;
        },
      });
    }
  }

  reset(){
    this.registForm.reset();
    this.close();
    this.isLoading = false;    
    this.onClose.emit(true);    
  }

}
