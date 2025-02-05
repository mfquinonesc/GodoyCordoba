import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';
import { guardGuard } from './guard.guard';

const routes: Routes = [
  { path: '', component: MainComponent, },
  { path: 'home', component: HomeComponent, canActivate: [guardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
