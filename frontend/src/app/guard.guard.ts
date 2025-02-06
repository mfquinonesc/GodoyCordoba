import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const loginServise = Inject(LoginService);
  return true;
};
