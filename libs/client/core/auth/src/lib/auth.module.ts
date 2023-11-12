import { NgModule } from "@angular/core";
import { provideAuth } from "./auth.provider";

@NgModule({
  imports: [],
  providers: [
    provideAuth()
  ],
})

export class AuthModule {}
