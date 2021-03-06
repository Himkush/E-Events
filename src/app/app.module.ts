import { EventBusService } from './shared/service/event-bus.service';
import { EventFormService } from './shared/service/event-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimepickerModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FooterComponent } from './footer/footer.component';
import { EventFormComponent } from './event-form/event-form.component';

import { environment } from './../environments/environment';
import { EventCardComponent } from './event/event-card/event-card.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ParticipationListService } from './shared/service/participation.service';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './services/auth.service';
import {RegisterService} from './services/register.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import {AuthGuard} from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JumbotronComponent,
    FooterComponent,
    EventFormComponent,
    EventCardComponent,
    EventComponent,
    EventsComponent,
    EventDetailComponent,
    LoginComponent,
    RegisterComponent,
    EditUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [EventFormService, AngularFirestore, ParticipationListService,
    EventBusService, AuthService, RegisterService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
