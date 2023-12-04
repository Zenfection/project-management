import { NgModule } from '@angular/core';
import { PlanTodoNotFoundComponent } from '../not-found/not-found.component';
import { PlanTodoAttachFilesComponent } from './attach-files.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [PlanTodoNotFoundComponent, NgIf, NgFor, NgClass, MatIconModule],
  declarations: [PlanTodoAttachFilesComponent],
  exports: [PlanTodoAttachFilesComponent],
})
export class PlanTodoAttachFilesModule {}
