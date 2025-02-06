import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  usuarios: Usuario[] = [];
  copy: Usuario[] = [];

  usuario: Usuario = {} as Usuario;

  isEditing: boolean = false;
  isCreating: boolean = false;
  text: string = '';

  constructor(private userService: UserService) {
    this.initialize();
  }

  initialize() {
    this.userService.getAll().subscribe({
      next: (value) => {
        this.usuarios = value.users as Usuario[];
        this.copy = this.usuarios;
      },
      complete: () => {
        this.close();
      },
    });
  }

  delete(id: number) {
    this.userService.delete(id).subscribe({
      next: (value) => {},
      complete: () => {
        this.initialize();
      },
    });
  }

  read(id: number) {
    const user = this.usuarios.find((u) => u.usuarioId == id);
    if (user) {
      this.isEditing = true;
      this.usuario = user;
    }
  }

  close() {
    this.isEditing = false;
    this.isCreating = false;
  }

  create() {
    this.close();
    this.isCreating = true;
  }

  search() {
    if (this.text) {
      this.usuarios = this.copy.filter((u) => {
        return (
          u.nombre.toLowerCase().includes(this.text.toLowerCase()) ||
          u.apellido.toLowerCase().includes(this.text.toLowerCase())
        );
      });
    } else {
      this.usuarios = this.copy;
    }
  }
}
