import { NgModule } from '@angular/core';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [ContactsRoutingModule],
  providers: [],
  exports: [ContactsComponent],
})
export class ContactsModule {}
