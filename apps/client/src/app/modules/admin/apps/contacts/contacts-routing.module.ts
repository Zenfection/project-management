import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsService } from './contacts.service';
import { ContactsDetailsComponent } from './details/details.component';
import { ContactsComponent } from './contacts.component';
import { ContactsListComponent } from './list/list.component';
import { ContactResolver } from './resolvers/contact.resolver';
import { ContactsGuardCanDeactivate } from './guards/contacts.guard';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    resolve: {
      tags: () => inject(ContactsService).getTags(),
    },
    children: [
      {
        path: '',
        component: ContactsListComponent,
        resolve: {
          contacts: () => inject(ContactsService).getContacts(),
          countries: () => inject(ContactsService).getCountries(),
        },
        children: [
          {
            path: ':id',
            component: ContactsDetailsComponent,
            resolve: {
              contact: ContactResolver,
              countries: () => inject(ContactsService).getCountries(),
            },
            canDeactivate: [ContactsGuardCanDeactivate],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
