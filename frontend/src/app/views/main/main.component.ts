import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  
  constructor(private loginService: LoginService) {}

  get mode(): boolean {
    let res = false;
    this.loginService.getMode().subscribe({
      next: (value) => {
        res = value;
      },
    });
    return res;
  }
}
