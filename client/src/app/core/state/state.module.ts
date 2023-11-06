import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PlansFacade } from './plans/plans.facade';
import { UserFacade } from './user/user.facade';
import { SettingEffects } from './setting/setting.effect';
import { UserEffects } from './user/user.effect';
import { SettingFacade } from './setting/setting.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([SettingEffects, UserEffects]),
  ],
  providers: [PlansFacade, UserFacade, SettingFacade],
})
export class StateModule {}
