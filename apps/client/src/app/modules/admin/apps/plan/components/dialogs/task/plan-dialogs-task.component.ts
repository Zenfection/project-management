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
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TasksFacade } from '@client/core-state';
import { CreateTask, Member, Task } from '@client/shared/interfaces';
import { fuseAnimations } from '@fuse/animations';
import { DateTime } from 'luxon';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'plan-dialog-task',
  templateUrl: './plan-dialogs-task.component.html',
  animations: fuseAnimations,
})
export class PlanDialogsTaskComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('ownerInput') ownerInput: ElementRef<HTMLInputElement>;
  ownerSearch = new FormControl('');

  taskForm: UntypedFormGroup;
  task: Task;
  filterMembers$: Observable<Member[]>;

  private readonly _positionStep: number = 65536;
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

  private getNextPosition() {
    this._taskFacade.tasks$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((tasks) => {
          // filter all tasks with status OPEN
          const openTasks = tasks.filter((task) => task.status === 'OPEN');
          return openTasks.length
            ? openTasks[openTasks.length - 1].position + this._positionStep
            : this._positionStep;
        }),
      )
      .subscribe((position) => {
        this._taskFacade.loadNextPosition(position);
      });
  }

  ngOnInit(): void {
    // Get Next Position
    this.getNextPosition();

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
      position: 0,
      priority: this.taskForm.get('priority').value,
      status: 'OPEN',
    };

    // Get next position
    this._taskFacade.nextPosition$.subscribe((position) => {
      data.position = position;
    });

    this._taskFacade.createTask(data);
    this.closeDialog();

    this._changeDetectorRef.markForCheck();
  }
}
