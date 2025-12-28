import { Component, input, output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  open = input<boolean>(false);
  title = input<string>('');
  description = input<string>('');
  cancelText = input<string>('Cancel');
  confirmText = input<string>('Confirm');
  confirmVariant = input<'default' | 'destructive'>('default');
  showConfirm = input<boolean>(true);
  loading = input<boolean>(false);

  close = output<void>();
  confirm = output<void>();

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close.emit();
    }
  }
}
