import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PlansFacade, TasksFacade } from '@client/core-state';
import {
  CreateTask,
  Member,
  Task,
  UpdateTask,
} from '@client/shared/interfaces';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'plan-dialog-task',
  templateUrl: './plan-dialogs-task.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDialogsTaskComponent implements OnInit, OnDestroy {
  taskForm: UntypedFormGroup;
  task: Task;
  members: Member[];
  planId: number;

  filterMembers$: Observable<Member[]>;

  private nextPosition: number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { task: Task; planId: number; members: Member[] },
    private _fromBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _taskFacade: TasksFacade,
    private readonly _planFacade: PlansFacade,
  ) {
    this.task = this._data.task;
  }

  ngOnInit(): void {
    // get members and planId
    this._planFacade.selectedPlan$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((plan) => {
        this.planId = plan.id;
        this.members = plan.members;
      });

    // Get Next Position
    this._taskFacade.nextPosition$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((position) => {
        this.nextPosition = position;
      });

    // Edit Form
    if (this._data.task.id) {
      this.taskForm = this._fromBuilder.group({
        title: [this._data.task.title, Validators.required],
        description: [this._data.task.description, Validators.required],
        labels: [this._data.task.labels],
        dueDate: [this._data.task.dueDate, Validators.required],
        assignee: [this._data.task.assignee.info.email, Validators.required],
        priority: [this._data.task.priority, Validators.required],
      });
    } else {
      // Create Form
      this.taskForm = this._fromBuilder.group({
        title: [this._data.task.title || '', Validators.required],
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

  selectAssignee(email: string): void {
    this.taskForm.get('assignee').setValue(email);
  }

  selectDueDate(date: Date): void {
    this.taskForm.get('dueDate').setValue(date);
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
          id: this.planId,
        },
      },
      position: this.nextPosition,
      priority: this.taskForm.get('priority').value,
      status: 'OPEN',
    };

    this._taskFacade.createTask(data);
    this.closeDialog();

    this._changeDetectorRef.markForCheck();
  }

  handleUpdate(): void {
    const dataUpdate: UpdateTask = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      dueDate: this.taskForm.get('dueDate').value,
      assignee: {
        connect: {
          email: this.taskForm.get('assignee').value,
        },
      },
      priority: this.taskForm.get('priority').value,
    };

    this._taskFacade.updateTask(dataUpdate);
    this.closeDialog();
    this._changeDetectorRef.markForCheck();
  }
}
