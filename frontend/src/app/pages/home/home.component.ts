import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { KeynoteService } from '../../services/keynote.service';
import { ConferenceService } from '../../services/conference.service';
import { ButtonComponent } from '../../components/ui/button.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent } from '../../components/ui/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  private keynoteService = inject(KeynoteService);
  private conferenceService = inject(ConferenceService);

  keynoteCount = signal(0);
  conferenceCount = signal(0);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadStats();
    }
  }

  private loadStats(): void {
    this.keynoteService.getKeynotes().subscribe({
      next: (keynotes) => this.keynoteCount.set(keynotes.length),
      error: () => this.keynoteCount.set(0)
    });

    this.conferenceService.getConferences().subscribe({
      next: (conferences) => this.conferenceCount.set(conferences.length),
      error: () => this.conferenceCount.set(0)
    });
  }
}
