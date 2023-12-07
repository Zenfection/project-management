import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidateFormsService {
  constructor() {}

  required(control: AbstractControl): boolean {
    return control.hasError('required');
  }

  minLength(control: AbstractControl): boolean {
    return control.hasError('minlength') && control.dirty;
  }

  maxLength(control: AbstractControl): boolean {
    return control.hasError('maxlength') && control.dirty;
  }
}
