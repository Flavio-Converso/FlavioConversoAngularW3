import { Component } from '@angular/core';
import { iFavMovies } from '../../models/ifavmovies';
import { FavmoviesService } from '../../services/favmovies.service';
import { AuthService } from '../../auth/auth.service';
import { iMovies } from '../../models/imovies';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favMovies: iFavMovies[] = [];
  userId!: number | null;

  constructor(
    private favMoviesService: FavmoviesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadFavoriteMovies();
      }
    });
  }

  loadFavoriteMovies() {
    if (this.userId !== null) {
      this.favMoviesService
        .getFavMoviesByUserId(this.userId)
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
}
