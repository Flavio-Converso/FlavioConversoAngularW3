import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { UniqueMovieDetailsComponent } from './uniquemoviedetails/uniquemoviedetails.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-movie', component: NewMovieComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movie/:id', component: UniqueMovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
