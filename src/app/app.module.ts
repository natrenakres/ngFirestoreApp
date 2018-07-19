import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Route } from "@angular/router";

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from '../environments/environment';
import { MatchListComponent } from './tahminilig/match-list/match-list.component';
import { TahminiligModule } from './tahminilig/tahminilig.module';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { CompetitionData } from "./tahminilig/competition-data";

const routes: Route[] = [
  { path: '', redirectTo: 'match-list', pathMatch: 'full' },
  { path: 'match-list', component: MatchListComponent },
  { path: '**', component: MatchListComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(CompetitionData),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase, 'Employees'),
    AngularFirestoreModule,
    TahminiligModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
