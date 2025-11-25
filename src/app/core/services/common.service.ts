import { Injectable } from '@angular/core';
import { VALIDATION_MESSAGES } from '../common/constant';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  getFormErrors(form: FormGroup): string {
    for (const key in form.controls) {
      const control = form.get(key);
      if (control && control.errors) {
        const errors = control.errors;
        if (VALIDATION_MESSAGES[key]) {
          for (const errorKey in errors) {
            if (VALIDATION_MESSAGES[key][errorKey]) {
              return VALIDATION_MESSAGES[key][errorKey];
            }
          }
        }
        return `${key} is invalid`;
      }
    }
    return '';
  }
}
