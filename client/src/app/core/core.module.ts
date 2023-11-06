import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StateModule } from './state/state.module';
import { UserService } from './user/user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, StateModule],
  providers: [UserService],
})
export class CoreModule {}
