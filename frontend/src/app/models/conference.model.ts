import { Keynote } from './keynote.model';

export type ConferenceType = 'ACADEMIC' | 'COMMERCIAL';

export interface Conference {
    id: string;
    title: string;
    type: ConferenceType;
    date: string;
    duration: number;
    numberOfEnrollments: number;
    score: number;
    keynote?: Keynote;
}

export interface ConferenceRequest {
    title: string;
    type: string;
    date: string;
    duration: number;
    numberOfEnrollments: number;
    score: number;
    keynoteId: string;
}
