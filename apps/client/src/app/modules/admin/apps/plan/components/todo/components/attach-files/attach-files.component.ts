import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { File } from '@client/shared/interfaces';

@Component({
  selector: 'plan-todo-attach-files',
  templateUrl: './attach-files.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTodoAttachFilesComponent {
  @Input() files: File[];

  selectedFile: boolean = false;
  filePreview: string;

  onFileSelected(event) {
    const file = event.target.files[0];
    this.selectedFile = true;
    this.filePreview = URL.createObjectURL(file);
  }
}
