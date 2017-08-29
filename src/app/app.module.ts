import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';
import { HttpModule } from '@angular/http';

import { BackendService } from './services/backend.service';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    UsersComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [ ApiService, BackendService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
