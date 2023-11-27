import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TasksFacade } from '@client/core-state';
import { CreateTask, Member, Task } from '@client/shared/interfaces';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { DateTime } from 'luxon';
import { Observable, Subject, map, startWith } from 'rxjs';

@Component({
  selector: 'plan-dialog-task',
  templateUrl: './plan-dialogs-task.component.html',
  standalone: true,
  animations: fuseAnimations,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    TextFieldModule,
    TranslocoModule,
    AsyncPipe,
    DatePipe,
  ],
})
export class PlanDialogsTaskComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  taskForm: UntypedFormGroup;
  task: Task;
  filterMembers$: Observable<Member[]>;

  ownerSearch = new FormControl('');
  @ViewChild('ownerInput') ownerInput: ElementRef<HTMLInputElement>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { task: Task; planId: number; members: Member[] },
    private _fromBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _taskFacade: TasksFacade,
  ) {
    this.task = this._data.task;
  }

  ngOnInit(): void {
    // Edit Form
    if (this._data.task.id) {
      this.taskForm = this._fromBuilder.group({
        title: [this._data.task.title, Validators.required],
        description: [this._data.task.description, Validators.required],
        labels: [this._data.task.labels],
        dueDate: [this._data.task.dueDate, Validators.required],
        assignee: [this._data.task.assignee, Validators.required],
      });
    } else {
      // Create Form
      this.taskForm = this._fromBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        labels: [[]],
        dueDate: [null, Validators.required],
        assignee: ['', Validators.required],
        priority: ['', Validators.required],
      });
    }

    // dectect dueDate changes
    this.taskForm.get('dueDate').valueChanges.subscribe((value) => {
      this.task.dueDate = value;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    this.filterMembers$ = this.ownerSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  dueDateFilter = (d: Date | null): boolean => {
    const date = d || new Date();

    return date >= new Date();
  };

  private _filter(value: string): Member[] {
    if (typeof value === 'string') {
      value = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return this._data.members.filter((member) =>
        member.info.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(value),
      );
    } else {
      return this._data.members;
    }
  }

  /**
   * Check if the given date is overdue
   */
  isOverdue(date: string): boolean {
    return (
      DateTime.fromISO(date).startOf('day') < DateTime.now().startOf('day')
    );
  }

  require(name: string) {
    return (
      this.taskForm.get(name).hasError('required') &&
      this.taskForm.get(name).touched
    );
  }

  closeDialog(): void {
    this._matDialog.closeAll();
  }

  handleSubmit(): void {
    const data: CreateTask = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      dueDate: this.taskForm.get('dueDate').value,
      assignee: {
        connect: {
          email: this.taskForm.get('assignee').value,
        },
      },
      plan: {
        connect: {
          id: this._data.planId,
        },
      },
      priority: this.taskForm.get('priority').value,
      order: this.task.order ? this.task.order + 1 : 0,
      status: 'OPEN',
    };

    this._taskFacade.createTask(data);
    this.closeDialog();

    this._changeDetectorRef.markForCheck();
  }

  handleUpdate(): void {
    console.log('update');
  }
}
