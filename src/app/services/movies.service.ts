import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iMovies } from '../models/imovies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl: string = 'http://localhost:3000/movies-popular';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<iMovies[]> {
    return this.http.get<iMovies[]>(this.apiUrl);
  }

  getById(id: number): Observable<iMovies> {
    return this.http.get<iMovies>(`${this.apiUrl}/${id}`);
  }

  createMovie(newMovie: Partial<iMovies>): Observable<iMovies> {
    return this.http.post<iMovies>(this.apiUrl, newMovie);
  }

  //updateMovie(movie: iMovies): Observable<iMovies> {
  //  return this.http.put<iMovies>(`${this.apiUrl}/${movie.id}`, movie);
  //}

  deleteMovie(id: number): Observable<iMovies> {
    return this.http.delete<iMovies>(`${this.apiUrl}/${id}`);
  }

  loadMovies(): Observable<iMovies[]> {
    return this.getAllMovies();
  }
}
