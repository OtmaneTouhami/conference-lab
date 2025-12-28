import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Keynote, KeynoteRequest } from '../models/keynote.model';

@Injectable({ providedIn: 'root' })
export class KeynoteService {
    private http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/keynote-service/api/v1/keynotes`;

    getKeynotes(): Observable<Keynote[]> {
        return this.http.get<Keynote[]>(this.baseUrl);
    }

    getKeynoteById(id: string): Observable<Keynote> {
        return this.http.get<Keynote>(`${this.baseUrl}/${id}`);
    }

    createKeynote(keynote: KeynoteRequest): Observable<Keynote> {
        return this.http.post<Keynote>(this.baseUrl, keynote);
    }

    updateKeynote(id: string, keynote: KeynoteRequest): Observable<Keynote> {
        return this.http.put<Keynote>(`${this.baseUrl}/${id}`, keynote);
    }

    deleteKeynote(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
