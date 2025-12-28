import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './auth/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { KeynoteListComponent } from './pages/keynotes/keynote-list.component';
import { KeynoteFormComponent } from './pages/keynotes/keynote-form.component';
import { ConferenceListComponent } from './pages/conferences/conference-list.component';
import { ConferenceFormComponent } from './pages/conferences/conference-form.component';
import { ConferenceDetailComponent } from './pages/conferences/conference-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'keynotes',
        component: KeynoteListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'keynotes/new',
        component: KeynoteFormComponent,
        canActivate: [authGuard, adminGuard]
    },
    {
        path: 'keynotes/:id/edit',
        component: KeynoteFormComponent,
        canActivate: [authGuard, adminGuard]
    },
    {
        path: 'conferences',
        component: ConferenceListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'conferences/new',
        component: ConferenceFormComponent,
        canActivate: [authGuard, adminGuard]
    },
    {
        path: 'conferences/:id',
        component: ConferenceDetailComponent,
        canActivate: [authGuard]
    },
    {
        path: 'conferences/:id/edit',
        component: ConferenceFormComponent,
        canActivate: [authGuard, adminGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
