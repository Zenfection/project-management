import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  Category,
  CreatePlan,
  Member,
  Plan,
  UpdatePlan,
} from '@client/shared/interfaces';
import { TranslocoModule } from '@ngneat/transloco';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  map,
  startWith,
} from 'rxjs';
import { PlansFacade, UserFacade } from '@client/core-state';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { PlanService } from '../../services/plan.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'plan-new',
  templateUrl: './new.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    NgFor,
    NgClass,
    MatRippleModule,
    MatDialogModule,
    AsyncPipe,
    TranslocoModule,
  ],
})
export class PlanNewComponent implements OnInit, OnDestroy, AfterContentInit {
  currentEmail: string;
  planForm: UntypedFormGroup;
  allMembers: Member[];
  members: Member[] = [];
  filteredMembers: Observable<Member[]>;
  allCategory: Category[];
  plan: Plan;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // MemberCtrl = new FormControl('');
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { plan: Plan },
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _plansFacade: PlansFacade,
    private readonly _userFacade: UserFacade,
    private readonly _planService: PlanService,
  ) {
    this.plan = this._data.plan;
  }

  ngOnInit(): void {
    // Edit Form
    if (this._data.plan) {
      this.members = this.plan.members;
      this.planForm = this._formBuilder.group({
        title: [this.plan.title || '', Validators.required],
        description: [this.plan.description || '', Validators.required],
        category: [this.plan.category['slug'] || '', Validators.required],
        members: [this.members, Validators.required],
      });
    } else {
      // Add Form
      this.planForm = this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        members: [this.members, Validators.required],
      });
    }

    // Create Plan From

    //get members
    combineLatest([
      this._planService.getMembers(),
      this._plansFacade.categories$,
      this._userFacade.user$,
    ]).subscribe(([members, categories, user]) => {
      this.allMembers = members.filter(
        (member) =>
          !this.members.some(
            (selectedMember) => selectedMember.id === member.id,
          ),
      );

      this.allCategory = categories;
      this.currentEmail = user.email;
    });
  }

  ngAfterContentInit() {
    this.filteredMembers = this.planForm.get('members').valueChanges.pipe(
      startWith(null),
      debounceTime(500),
      map((member: string | null) => {
        //remove member from this._filter
        return this._filter(member);
      }),
    );

    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  //? Chips AutoComplete
  remove(value: string): void {
    const find = this.members.find((member) => member.info.name === value);
    const index = this.members.indexOf(find);
    this.allMembers.push(find);

    if (index >= 0) {
      this.members.splice(index, 1);
    }

    this._changeDetectorRef.detectChanges();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const find = this.allMembers.find(
      (member) => member.info.name === event.option.viewValue,
    );
    this.members.push(find);
    this.allMembers.splice(this.allMembers.indexOf(find), 1);
    this.memberInput.nativeElement.value = '';

    this._changeDetectorRef.detectChanges();
  }

  private _filter(value: string | null): Member[] {
    if (typeof value === 'string') {
      value = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return this.allMembers.filter((member) =>
        member.info.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(value),
      );
    } else {
      return this.allMembers;
    }
  }

  //? Close Dialog
  closeNewPlan(): void {
    this._matDialog.closeAll();
  }

  handleSubmit(): void {
    const dataPlan: CreatePlan = {
      title: this.planForm.get('title').value,
      description: this.planForm.get('description').value,
      slug: this.planForm
        .get('title')
        .value.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '-'),
      category: {
        connect: {
          slug: this.planForm.get('category').value,
        },
      },
      owner: {
        connect: {
          email: this.currentEmail,
        },
      },
      members: {
        connect: this.members.map((member) => {
          return { email: member.info.email };
        }),
      },
    };

    this._plansFacade.createPlan(dataPlan);

    this._changeDetectorRef.detectChanges();

    this._matDialog.closeAll();

    this.planForm.reset();
  }

  handUpdate(): void {
    const dataPlan: UpdatePlan = {
      title: this.planForm.get('title').value,
      description: this.planForm.get('description').value,
      slug: this.planForm
        .get('title')
        .value.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '-'),
      category: {
        connect: {
          slug: this.planForm.get('category').value,
        },
      },
      owner: {
        connect: {
          email: this.currentEmail,
        },
      },
      members: {
        set: [],
        connect: this.members.map((member) => {
          return { email: member.info.email };
        }),
      },
    };
    // transfer dataPlan to json

    this._plansFacade.updatePlan(dataPlan);
    this._changeDetectorRef.detectChanges();
    this._matDialog.closeAll();
  }

  //? Validate From
  require(name: string) {
    return (
      this.planForm.get(name).hasError('required') &&
      this.planForm.get(name).touched
    );
  }

  minLength(name: string) {
    return this.planForm.get(name).hasError('minlength');
  }
}
