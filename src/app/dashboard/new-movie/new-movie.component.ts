import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../models/imovies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss'],
})
export class NewMovieComponent {
  movies: iMovies[] = [];
  createMovieForm!: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.moviesService.loadMovies().subscribe((movies) => {
      this.movies = movies;
    });

    // Initialize the form with validators
    this.createMovieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
      image: ['https://placedog.net/500', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  createMovie() {
    if (this.createMovieForm.valid) {
      const newMovie: iMovies = this.createMovieForm.value;
      this.moviesService.createMovie(newMovie).subscribe(() => {
        this.moviesService.loadMovies().subscribe((movies) => {
          this.movies = movies;
        });
        this.createMovieForm.reset({
          title: '',
          duration: 1,
          rating: 0,
          image: 'https://placedog.net/500',
          description: '',
        });
        this.router.navigate(['/dashboard']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
