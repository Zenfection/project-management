import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';
import { Label } from '@prisma/client';
import { cloneDeep } from 'lodash-es';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'plan-extras-labels',
  templateUrl: './plan-extras-labels.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanExtrasLabelsComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Output() labelsChange: EventEmitter<Label[]> = new EventEmitter<Label[]>();

  labels$: Observable<Label[]> = this._taskFacade.labels$;
  filteredLabels: Label[];

  @ViewChild('labelsPanel') private _labelsPanel: TemplateRef<any>;
  @ViewChild('labelsPanelOrigin') private _labelsPanelOrigin: ElementRef;

  labelsEditMode: boolean = false;

  private _labelsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _overlay: Overlay,
    private _renderer2: Renderer2,
    private _viewContainerRef: ViewContainerRef,
    private readonly _taskFacade: TasksFacade,
  ) {}

  ngOnInit(): void {
    this.task = cloneDeep(this.task);

    // Get the tags
    this.labels$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((labels: Label[]) => {
        this.filteredLabels = labels;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlays if they are still on the DOM
    if (this._labelsPanelOverlayRef) {
      this._labelsPanelOverlayRef.dispose();
    }
  }

  checkedLabels(label: Label): boolean {
    const index = this.task.labels.findIndex((item) => item.id === label.id);
    return index >= 0;
  }

  /**
   * Open labels panel
   */
  openLabelsPanel(): void {
    // Create the overlay
    this._labelsPanelOverlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._labelsPanelOrigin.nativeElement)
        .withFlexibleDimensions(true)
        .withViewportMargin(64)
        .withLockedPosition(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });

    // Subscribe to the attachments observable
    this._labelsPanelOverlayRef.attachments().subscribe(() => {
      // Add a class to the origin
      this._renderer2.addClass(
        this._labelsPanelOrigin.nativeElement,
        'panel-opened',
      );

      // Focus to the search input once the overlay has been attached
      this._labelsPanelOverlayRef.overlayElement.querySelector('input').focus();
    });

    // Create a portal from the template
    const templatePortal = new TemplatePortal(
      this._labelsPanel,
      this._viewContainerRef,
    );

    // Attach the portal to the overlay
    this._labelsPanelOverlayRef.attach(templatePortal);

    // Subscribe to the backdrop click
    this._labelsPanelOverlayRef.backdropClick().subscribe(() => {
      // Remove the class from the origin
      this._renderer2.removeClass(
        this._labelsPanelOrigin.nativeElement,
        'panel-opened',
      );

      // If overlay exists and attached...
      if (
        this._labelsPanelOverlayRef &&
        this._labelsPanelOverlayRef.hasAttached()
      ) {
        // Detach it
        this._labelsPanelOverlayRef.detach();

        // Reset the label filter
        this.labels$.subscribe((labels) => {
          this.filteredLabels = labels;
        });
        // this.filteredLabels = this.labels$.subscribe;

        // Toggle the edit mode off
        this.labelsEditMode = false;
      }

      // If template portal exists and attached...
      if (templatePortal && templatePortal.isAttached) {
        // Detach it
        templatePortal.detach();
      }
    });
  }

  /**
   * Toggle the labels edit mode
   */
  toggleLabelsEditMode(): void {
    this.labelsEditMode = !this.labelsEditMode;
  }

  /**
   * Filter labels
   *
   * @param event
   */
  filterLabels(event): void {
    // Get the value
    const value = event.target.value.toLowerCase();

    // Filter the tags
    this.labels$.pipe(takeUntil(this._unsubscribeAll)).subscribe((labels) => {
      this.filteredLabels = labels.filter((tag) =>
        tag.name.toLowerCase().includes(value),
      );
    });
  }

  /**
   * Filter labels input key down event
   *
   * @param event
   */
  filterLabelsInputKeyDown(event): void {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }

    // If there is no label available...
    if (this.filterLabels.length === 0) {
      // Create the tag
      // this.createTag(event.target.value);

      // Clear the input
      event.target.value = '';

      // Return
      return;
    }

    // If there is a label...
    const label = this.filterLabels[0];
    const isTagApplied = this.task.labels.find((item) => item.id === label.id);

    // If the found tag is already applied to the contact...
    if (isTagApplied) {
      // Remove the tag from the contact
      this.removeLabelFromTask(label);
    } else {
      // Otherwise add the tag to the contact
      this.addLabelToTask(label);
    }
  }

  /**
   * Add label to the task
   *
   * @param label
   */
  addLabelToTask(label: Label): void {
    // Add the label
    this.task.labels.push(label);
  }

  /**
   * Remove label from the task
   *
   * @param label
   */
  removeLabelFromTask(label: Label): void {
    // Remove the tag
    this.task.labels.splice(
      this.task.labels.findIndex((item) => item.id === label.id),
      1,
    );
  }

  /**
   * Toggle contact label
   *
   * @param label
   */
  toggleTaskLabel(label: Label): void {
    if (this.checkedLabels(label)) {
      this.removeLabelFromTask(label);
      this.labelsChange.emit(this.task.labels);
    } else {
      this.addLabelToTask(label);
      this.labelsChange.emit(this.task.labels);
    }
  }
}
