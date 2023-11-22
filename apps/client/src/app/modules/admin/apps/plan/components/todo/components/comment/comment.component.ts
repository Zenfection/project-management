import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserFacade } from '@client/core-state';
import { Observable } from 'rxjs';
import { Task, User } from '@client/shared/interfaces';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FuseCardComponent } from '@fuse';
import { MatMenuModule } from '@angular/material/menu';
import { TimeElapsedPipe } from '@tools';

@Component({
  selector: 'plan-todo-comment',
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    NgFor,
    NgClass,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    FuseCardComponent,
    PushPipe,
    LetDirective,
    TimeElapsedPipe,
    DatePipe,
  ],
})
export class PlanTodoCommentComponent implements OnInit {
  @Input() task: Task;

  user$: Observable<User> = this._userFacade.user$;
  CommentForm: UntypedFormGroup;

  constructor(
    private readonly _userFacade: UserFacade,
    private readonly _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.CommentForm = this._formBuilder.group({
      content: ['', Validators.required],
    });
  }
}
