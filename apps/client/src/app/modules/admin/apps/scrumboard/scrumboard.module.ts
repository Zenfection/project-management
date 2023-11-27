import { NgModule } from '@angular/core';
import { ScrumboardComponent } from './scrumboard.component';
import { ScrumboardRoutingModule } from './srumboard-routing.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [ScrumboardRoutingModule, RouterOutlet],
  declarations: [ScrumboardComponent],
  exports: [ScrumboardComponent],
})
export class ScrumBoardModule {
  constructor() {}
}
