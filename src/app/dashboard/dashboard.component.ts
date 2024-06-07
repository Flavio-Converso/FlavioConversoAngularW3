import { Component } from '@angular/core';
import { iMovies } from '../models/imovies';
import { iFavMovies } from '../models/ifavmovies';
import { MoviesService } from '../services/movies.service';
import { FavmoviesService } from '../services/favmovies.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  movies: iMovies[] = [];
  favMovies: iFavMovies[] = [];
  userId!: number;

  constructor(
    private moviesService: MoviesService,
    private favMoviesService: FavmoviesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadMovies();
        this.loadFavoriteMovies();
      }
    });
  }

  loadMovies() {
    this.moviesService.loadMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  loadFavoriteMovies() {
    if (this.userId !== null) {
      this.favMoviesService
        .loadFavoriteMovies(this.userId)
        .subscribe((favMovies) => {
          this.favMovies = favMovies;
        });
    }
  }

  toggleFavourite(movie: iMovies) {
    if (this.userId === null) return;

    this.favMoviesService
      .toggleFavourite(this.userId, movie, this.favMovies)
      .subscribe(() => {
        this.loadFavoriteMovies();
      });
  }

  isFavourite(movie: iMovies): boolean {
    return !!this.favMovies.find((fav) => fav.movie.id === movie.id);
  }

  //forse finalmente funziona da ricontrollare
  deleteMovie(id: number) {
    this.favMoviesService.getAllFavMovies().subscribe((favMovies) => {
      const favMovie = favMovies.find((fav) => fav.movie.id === id);
      if (favMovie) {
        this.favMoviesService.deleteAllFavMoviesByMovieId(id).subscribe(() => {
          this.moviesService.deleteMovie(id).subscribe(() => {
            this.loadMovies();
            this.loadFavoriteMovies();
          });
        });
      } else {
        this.moviesService.deleteMovie(id).subscribe(() => {
          this.loadMovies();
          this.loadFavoriteMovies();
        });
      }
    });
  }
}
