import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoreModule } from '../core/core.module';

import { ClarityModule } from "clarity-angular";
import { ClarityIcons } from 'clarity-icons';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
//import { AppRoutingModule } from './app-routing.module';////////////////
import { NavComponent } from '../nav/nav.component';

import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MembersComponent } from '../members/members.component';

import { environment } from '../environments/environment';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PlantComponent } from '../plant/plant.component';
import { DownloadsComponent } from '../downloads/downloads.component';


import { GraphComponent } from '../graph/graph.component';

import { routes } from '../app.router';
import { AboutComponent } from '../about/about.component';
import { InstallationComponent } from '../installation/installation.component';
import { PlantSelectorComponent } from './plant-selector/plant-selector.component';
import { TableComponent } from './../table/table.component';
import { SubscribedComponent } from './../subscribed/subscribed.component';
import { UpdateComponent } from './../update/update.component';  //////////////////

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule,
    //AppRoutingModule,////////////////////////////////////
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CoreModule,
    routes, /////////////////
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MembersComponent,
    UserProfileComponent,
    NavComponent,
    SidenavComponent,
    PlantComponent,
    DownloadsComponent,
    GraphComponent,
    AboutComponent,
    InstallationComponent,
    PlantSelectorComponent,
    TableComponent,
    SubscribedComponent,
    UpdateComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
