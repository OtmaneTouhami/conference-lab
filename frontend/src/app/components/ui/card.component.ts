import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent { }

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './card-header.component.css'
})
export class CardHeaderComponent { }

@Component({
  selector: 'app-card-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './card-title.component.css'
})
export class CardTitleComponent { }

@Component({
  selector: 'app-card-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './card-description.component.css'
})
export class CardDescriptionComponent { }

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './card-content.component.css'
})
export class CardContentComponent { }

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './card-footer.component.css'
})
export class CardFooterComponent { }
