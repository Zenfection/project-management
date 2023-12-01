import { NgModule } from '@angular/core';
import { ScrumboardComponent } from './scrumboard.component';
import { ScrumboardRoutingModule } from './srumboard-routing.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoreUIModule } from '@client/core-ui';
import { TranslocoModule, provideTranslocoScope } from '@ngneat/transloco';
import { PushPipe } from '@ngrx/component';
import { TimeElapsedPipe } from '@tools';
import { ScrumboardBoardsComponent } from './boards/boards.component';

@NgModule({
  declarations: [ScrumboardComponent, ScrumboardBoardsComponent],
  imports: [
    ScrumboardRoutingModule,
    RouterOutlet,
    RouterLink,
    CdkScrollable,
    NgFor,
    NgClass,
    NgIf,
    MatIconModule,
    CoreUIModule,
    TranslocoModule,
    TimeElapsedPipe,
    PushPipe,
    TranslocoModule,
  ],
  providers: [provideTranslocoScope('scrumboard')],
  exports: [ScrumboardComponent, ScrumboardBoardsComponent],
})
export class ScrumBoardModule {
  constructor() {}
}
