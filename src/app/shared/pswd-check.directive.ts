import { ValidatorFn, AbstractControl } from '@angular/forms';

export default function passwordRepeatValidator(inputId: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const input = document.querySelector('#password') as HTMLInputElement;
    const isMatches = (input.value === control.value);
    return isMatches ? null : { repeatPassword: { value: control.value } };
  };
}
