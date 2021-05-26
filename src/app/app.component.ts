import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  stepCount: number = 1;
  isFormSubmitted:boolean = false;
  formGroup1: any;
  formGroup2: any;
  formGroup3: any;
  formsValidationObj: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stepCount = 1;
    this.isFormSubmitted = false;
    this.formGroup1 = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    });

    this.formGroup2 = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    });

    this.formGroup3 = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    });

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
    if(this.stepCount > 1) {
      this.isFormSubmitted = false;
      this.stepCount -= 1;
    }
  }
}
