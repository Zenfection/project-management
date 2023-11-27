import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TasksFacade } from '@client/core-state';
import { Label, Task, UpdateTask } from '@client/shared/interfaces';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { PlanExtrasLabelsComponent } from '../../../extras/labels/plan-extras-labels.component';

@Component({
  selector: 'plan-todo-mode-edit',
  templateUrl: './plan-todo-mode-edit.component.html',
  standalone: true,
  imports: [
    PlanExtrasLabelsComponent,
    NgIf,
    NgClass,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    TranslocoModule,
  ],
  animations: fuseAnimations,
})
export class PlanTodoModeEditComponent implements OnInit, OnDestroy {
  @Input() permissionTodo: boolean;
  @Input() task: Task;
  @Output() editMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private readonly _taskFacade: TasksFacade,
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.taskForm = this._formBuilder.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      dueDate: [this.task.dueDate, Validators.required],
      status: [this.task.status, Validators.required],
      labels: [this.task.labels],
      assignee: [this.task.assignee.info.email, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /*
    Public Methods
  */
  toggleEditMode(value: boolean): void {
    this.editMode.emit(value);
  }

  deleteTask(): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete task',
      message:
        'Are you sure you want to delete this task? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Delete the task
        this._taskFacade.deleteTask(this.task.id);
      }
    });
  }

  updateTask(): void {
    console.log(this.taskForm.get('labels').value);
    const dataTask: UpdateTask = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      status: this.taskForm.value.status,
      priority: this.task.priority,
      // order
      // files
      labels: {
        connect: this.taskForm.value.labels.map((label: Label) => ({
          id: label.id,
        })),
      },
      assignee: {
        connect: { email: this.taskForm.value.assignee },
      },
    };
    this._taskFacade.updateTask(dataTask);
    this.toggleEditMode(false);
  }

  require(name: string): boolean {
    return (
      this.taskForm.get(name).hasError('required') &&
      this.taskForm.get(name).touched
    );
  }
}
