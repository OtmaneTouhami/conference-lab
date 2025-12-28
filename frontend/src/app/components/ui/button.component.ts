import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  variant = input<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');
  size = input<'default' | 'sm' | 'lg' | 'icon'>('default');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  getButtonClasses(): string {
    return `variant-${this.variant()} size-${this.size()}`;
  }
}
