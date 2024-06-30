import {RegisterPageFields} from './enums.js'

export type VisibilityObject = {
  waitForDisplayedTimeout: number;
  pauseTime: number;
};

export type FieldTestData = {
  field: RegisterPageFields;
  promptText: string;
  expectedErrorMessage: string
}

export type RegistrationData = {
  name: string,
  email: string,
  confirmEmail: string,
  postalCode: number,
  password: string,
  confirmPassword: string

}