import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlansFacade } from '@client/core-state';
import { Plan } from '@client/shared/interfaces';
import {
  FuseConfirmationConfig,
  FuseConfirmationService,
} from '@fuse/services/confirmation';
import { cloneDeep } from 'lodash-es';
import { PlanDialogComponent } from '../../dialogs/plan.dialog/dialog-plan.component';

@Component({
  selector: 'plan-details-toolbar',
  templateUrl: './plan-details-toolbar.component.html',
})
export class PlanDetailsToolbarComponent {
  @Input() plan: Plan;

  constructor(
    private _matDialog: MatDialog,
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _plansFacade: PlansFacade,
  ) {}

  editFormDialog(plan: Plan): void {
    this._matDialog.open(PlanDialogComponent, {
      autoFocus: false,
      data: {
        plan: cloneDeep(plan),
      },
    });
  }

  openDeleteConfirmDialog(): void {
    const configDialog: FuseConfirmationConfig = {
      title: 'Delete Plan',
      message:
        'Are you sure you want to remove this planpermanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: {
        show: true,
        name: 'duotone:triangle-exclamation',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Remove',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Cancel',
        },
      },
      dismissible: true,
    };

    const dialogRef = this._fuseConfirmationService.open(configDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._plansFacade.deletePlan();
      }
    });
  }
}
