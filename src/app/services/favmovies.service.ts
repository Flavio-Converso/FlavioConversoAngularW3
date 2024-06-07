import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFavMovies } from '../models/ifavmovies';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { iMovies } from '../models/imovies';

@Injectable({
  providedIn: 'root',
})
export class FavmoviesService {
  apiUrl: string = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  getAllFavMovies(): Observable<iFavMovies[]> {
    return this.http.get<iFavMovies[]>(this.apiUrl);
  }

  // getById(id: number): Observable<iFavMovies> {
  //   return this.http.get<iFavMovies>(`${this.apiUrl}/${id}`);
  // }

  getFavMoviesByUserId(userId: number): Observable<iFavMovies[]> {
    return this.http.get<iFavMovies[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createFav(newMovie: Partial<iFavMovies>): Observable<iFavMovies> {
    return this.http.post<iFavMovies>(this.apiUrl, newMovie);
  }

  // updateFav(favMovie: iFavMovies): Observable<iFavMovies> {
  //   return this.http.put<iFavMovies>(`${this.apiUrl}/${favMovie.id}`, favMovie);
  // }

  delete(id: number): Observable<iFavMovies> {
    return this.http.delete<iFavMovies>(`${this.apiUrl}/${id}`);
  }

  loadFavoriteMovies(userId: number): Observable<iFavMovies[]> {
    return this.getFavMoviesByUserId(userId);
  }

  toggleFavourite(
    userId: number,
    movie: iMovies,
    favMovies: iFavMovies[]
  ): Observable<any> {
    const obj: Partial<iFavMovies> = {
      userId: userId,
      movie: movie,
    };

    const favMovie = favMovies.find(
      (fav) => fav.movie.id === movie.id && fav.userId === userId
    );
    if (favMovie) {
      return this.delete(favMovie.id);
    } else {
      return this.createFav(obj);
    }
  }
  deleteAllFavMoviesByMovieId(movieId: number): Observable<any> {
    return this.getAllFavMovies().pipe(
      switchMap((favMovies) => {
        const deleteObservables = favMovies
          .filter((fav) => fav.movie.id === movieId)
          .map((fav) => this.delete(fav.id));
        return forkJoin(deleteObservables);
      })
    );
  }
}
