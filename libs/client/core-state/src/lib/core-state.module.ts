import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../';
import { SettingEffects } from './setting/setting.effect';
import { UserEffects } from './user/user.effect';
import { PlansEffects } from './plans/plans.effect';
import { TasksEffects } from './tasks/tasks.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      SettingEffects,
      UserEffects,
      PlansEffects,
      TasksEffects,
    ]),
  ],
  providers: [],
})
export class CoreStateModule {}
