import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './badge.component.css',
  host: {
    '[class]': '"variant-" + variant()'
  }
})
export class BadgeComponent {
  variant = input<'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'>('default');
}
