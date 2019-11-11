import { EventFormComponent } from './event-form/event-form.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EditUserInfoComponent} from './edit-user-info/edit-user-info.component';


const routes: Routes = [
  { path: '', component: EventComponent},
  {path: 'event/:id', component: EventDetailComponent},
  {path: 'edit-event', component: EventFormComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'event-form', component: EventFormComponent},
  {path: 'edit-user-info', component: EditUserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
