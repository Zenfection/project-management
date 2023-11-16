import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../';
import { SettingEffects } from './setting/setting.effect';
import { UserEffects } from './user/user.effect';
import { PlansEffects } from './plans/plans.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([SettingEffects, UserEffects, PlansEffects]),
  ],
  providers: [],
})
export class CoreStateModule {}
