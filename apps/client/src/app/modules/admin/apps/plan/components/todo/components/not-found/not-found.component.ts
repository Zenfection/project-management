import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'plan-todo-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [MatIconModule],
})
export class PlanTodoNotFoundComponent {
  @Input() name: string;
  @Input() icon: string;
  constructor() {}
}
