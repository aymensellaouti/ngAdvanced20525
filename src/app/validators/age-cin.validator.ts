import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ageCinValidator(form: AbstractControl): null | ValidationErrors  {

  const cinFormControl = form.get('cin');
  if (cinFormControl?.invalid) return null;
  const cin = +cinFormControl?.value.substring(0, 2);
  const age = +form.get('age')?.value;

  if(!cin || !age) return null;

  if ((cin <20 && age<60) || (cin > 20 && age >=60)) return {ageCin: "L'age ne correspond pas au numéro du Cin"}
  return null;
}
