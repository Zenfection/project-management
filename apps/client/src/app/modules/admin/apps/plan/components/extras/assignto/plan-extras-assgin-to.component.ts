import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Member } from '@client/shared/interfaces';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'plan-extras-assign-to',
  templateUrl: './plan-extras-assgin-to.component.html',
})
export class PlanExtrasAssignToComponent implements AfterViewInit {
  @Input() members: Member[];
  @Input() ownerEmail: string;
  @Output() selectedMember: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('ownerInput') ownerInput: ElementRef<HTMLInputElement>;

  ownerSearch = new FormControl('');
  filterMembers$: Observable<Member[]>;

  ngAfterViewInit(): void {
    this.filterMembers$ = this.ownerSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  handleSelectionChange(event: MatSelectChange) {
    this.selectedMember.emit(event.value);
  }

  private _filter(value: string): Member[] {
    if (!this.members) {
      return [];
    }

    if (typeof value === 'string') {
      value = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return this.members.filter((member) =>
        member.info.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(value),
      );
    } else {
      return this.members;
    }
  }
}
