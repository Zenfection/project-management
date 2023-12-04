import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TasksFacade, UserFacade } from '@client/core-state';
import { Comment, CreateComment, User } from '@client/shared/interfaces';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'plan-todo-comment',
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlanTodoCommentComponent implements OnInit, OnDestroy {
  @Input() comments: Comment[];
  @Input() taskId: number;

  selectedFile: File = null;
  filePreview: string | ArrayBuffer;
  minRows: number = 3;

  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['clean'],
      ['link'],
    ],
  };

  user$: Observable<User> = this._userFacade.user$;
  CommentForm: UntypedFormGroup;

  customImageUpload(image: ArrayBuffer): void {
    console.log(image);
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      this.filePreview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.minRows = 5;
  }

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
        connect: { id: this.taskId },
      },
      user: {
        connect: { id: this.userId },
      },
    };

    this._tasksFacade.createComment(dataComment);

    this.CommentForm.reset();
  }
}
