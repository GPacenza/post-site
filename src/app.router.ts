import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PlantComponent } from './plant/plant.component';
import { AboutComponent } from './about/about.component';
import { InstallationComponent } from './installation/installation.component';
import { PlantSelectorComponent } from './app/plant-selector/plant-selector.component';
import { SubscribedComponent } from './subscribed/subscribed.component'
import { UpdateComponent } from './update/update.component';

export const router: Routes = [
  { path: '', redirectTo: 'plant', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'about', component: AboutComponent },
  { path: 'installation', component: InstallationComponent },
  { path: 'plant-selector', component: PlantSelectorComponent},
  { path: 'my-subscribed', component:SubscribedComponent},
  { path: 'my-update', component:UpdateComponent}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
