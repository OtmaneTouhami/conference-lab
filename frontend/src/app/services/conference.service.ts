import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conference, ConferenceRequest } from '../models/conference.model';

@Injectable({ providedIn: 'root' })
export class ConferenceService {
    private http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/conference-service/api/v1/conferences`;

    getConferences(): Observable<Conference[]> {
        return this.http.get<Conference[]>(this.baseUrl);
    }

    getConferenceById(id: string): Observable<Conference> {
        return this.http.get<Conference>(`${this.baseUrl}/${id}`);
    }

    createConference(conference: ConferenceRequest): Observable<Conference> {
        return this.http.post<Conference>(this.baseUrl, conference);
    }

    updateConference(id: string, conference: ConferenceRequest): Observable<Conference> {
        return this.http.put<Conference>(`${this.baseUrl}/${id}`, conference);
    }

    deleteConference(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
