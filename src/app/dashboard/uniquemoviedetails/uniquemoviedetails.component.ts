import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../models/imovies';

@Component({
  selector: 'app-uniquemoviedetails',
  templateUrl: './uniquemoviedetails.component.html',
  styleUrls: ['./uniquemoviedetails.component.scss'],
})
export class UniqueMovieDetailsComponent {
  movieId!: number;
  movie!: iMovies;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.loadMovieDetails(this.movieId);
    });
  }

  loadMovieDetails(id: number): void {
    this.moviesService.getById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }
}
