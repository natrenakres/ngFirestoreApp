import { Injectable } from '@angular/core';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { Competition } from './models/competition';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { tap, catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private competitionUrl = 'api/competitions';

  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
