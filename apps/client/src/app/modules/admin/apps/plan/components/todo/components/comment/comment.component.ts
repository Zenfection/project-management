import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
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
import { TasksFacade, UserFacade } from '@client/core-state';
import { Observable, Subject, map } from 'rxjs';
import { CreateComment, Task, User } from '@client/shared/interfaces';
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
export class PlanTodoCommentComponent implements OnInit, OnDestroy {
  @Input() task: Task;

  user$: Observable<User> = this._userFacade.user$;
  CommentForm: UntypedFormGroup;

  private userId: number;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private readonly _userFacade: UserFacade,
    private readonly _tasksFacade: TasksFacade,
    private readonly _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = Number(user.id);
    });

    this.CommentForm = this._formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onSubmit(): void {
    const dataComment: CreateComment = {
      content: this.CommentForm.value.content,
      task: {
        connect: { id: this.task.id },
      },
      user: {
        connect: { id: this.userId },
      },
    };

    this._tasksFacade.createComment(dataComment);
  }
}
