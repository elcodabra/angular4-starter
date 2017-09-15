import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './routing.module';

import { BackendService } from './services/backend.service';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListTweetsComponent } from './components/tweets/list/tweets-list.component';
import { NewTweetComponent } from './components/tweets/new/new-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListTweetsComponent,
    NewTweetComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ ApiService, BackendService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
