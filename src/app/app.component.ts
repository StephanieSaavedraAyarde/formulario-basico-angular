import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stepCount: number = 1;
  isFormSubmitted: boolean = false;
  formGroup1: any;
  formGroup2: any;
  formGroup3: any;
  formsValidationObj: any;
  salario;

  public form: FormGroup;
  public contactList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stepCount = 1;
    this.isFormSubmitted = false;
    this.formGroup1 = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.formGroup2 = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      ci: ['', Validators.required],
      fecha: ['', Validators.required],
      empleado: ['', Validators.required],
      area: ['', Validators.required],
      profesion: ['', Validators.required],
      antiguedad: ['', Validators.required],
      salario: ['', Validators.required],
      mes: ['', Validators.required]
    });

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;

    this.formsValidationObj = {
      form1Valid: false,
      form2Valid: false,
      form3Valid: false
    };
  }

  get form1() {
    return this.formGroup1.controls;
  }

  get form2() {
    return this.formGroup2.controls;
  }

  get form3() {
    return this.formGroup3.controls;
  }

  onNextClick() {
    this.isFormSubmitted = true;
    switch (this.stepCount) {
      case 1:
        if (!this.formGroup1.valid) {
          this.formsValidationObj.form1Valid = false;
          return;
        }
        this.formsValidationObj.form1Valid = true;
        this.isFormSubmitted = false;
        this.stepCount += 1;
        break;
      case 2:
        if (!this.formGroup2.valid) {
          this.formsValidationObj.form2Valid = false;
          return;
        }
        this.formsValidationObj.form2Valid = true;
        this.isFormSubmitted = false;
        this.stepCount += 1;
        break;
      case 3:
        if (!this.formGroup3.valid) {
          this.formsValidationObj.form3Valid = false;
          return;
        }
        this.formsValidationObj.form3Valid = true;
        this.isFormSubmitted = false;
        this.stepCount += 1;
        break;
      default:
        break;
    }
  }

  onPrevClick() {
    if (this.stepCount > 1) {
      this.isFormSubmitted = false;
      this.stepCount -= 1;
    }
  }

  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index) {
    let validators = null;

    if (this.getContactsFormGroup(index).controls['type'].value === 'email') {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);
    }

    this.getContactsFormGroup(index).controls['value'].setValidators(
      validators
    );

    this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }
}
