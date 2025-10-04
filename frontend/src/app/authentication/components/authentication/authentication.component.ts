import { Component, inject, input, output } from '@angular/core';
import { Credentials } from '../../interfaces/credentials.interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  login = output<Credentials>();
  errorMessage = input<string | null>();

  private formBuilder = inject(FormBuilder);
  form: FormGroup = this.initForm();

  initForm(): FormGroup {
    return this.formBuilder.group({
      login: [''],
      password: [''],
    });
  }
}
