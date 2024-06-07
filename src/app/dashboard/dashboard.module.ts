import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Page404Component } from './page404/page404.component';

import { NewMovieComponent } from './new-movie/new-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { UniqueMovieDetailsComponent } from './uniquemoviedetails/uniquemoviedetails.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Page404Component,
    NewMovieComponent,
    FavoritesComponent,
    ProfileComponent,
    UniqueMovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
