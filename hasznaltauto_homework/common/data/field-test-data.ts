import { FieldTestData, RegistrationData } from "../../common/types/types.js";
import {FIELD_MUST_BE_FILLED,
    NAME_MUST_BE_AT_LEAST_3_CHARACTER_LONG,
    NAME_CANT_START_OR_END_WITH_SPACE,
    EMAIL_ADDRESS_ALREADY_IN_USE,
    NOT_VALID_EMAIL_ADDRESS,
    PASSWORD_SHOULD_BE_AT_LEAST_8_CHARACTERS_LONG
} from "./labels.js";
import { EnvironmentVariables } from '../../config/environment-variables.js';
import { RegisterPageFields } from "../types/enums.js"

export const fieldTestData : FieldTestData [] = [
    {
        field:RegisterPageFields.NAME,
        promptText: "",
        expectedErrorMessage: FIELD_MUST_BE_FILLED
    },
    {
        field: RegisterPageFields.NAME,
        promptText: "S",
        expectedErrorMessage: NAME_MUST_BE_AT_LEAST_3_CHARACTER_LONG
    },
    {
        field: RegisterPageFields.NAME,
        promptText: "asd ",
        expectedErrorMessage: NAME_CANT_START_OR_END_WITH_SPACE
    },
    {
        field: RegisterPageFields.EMAIL,
        promptText: EnvironmentVariables.user_email,
        expectedErrorMessage: EMAIL_ADDRESS_ALREADY_IN_USE
    },
    {
        field: RegisterPageFields.EMAIL,
        promptText: "email_not_valid@email. com .",
        expectedErrorMessage: NOT_VALID_EMAIL_ADDRESS
    },
    {
        field: RegisterPageFields.PASSWORD,
        promptText: "jelszo",
        expectedErrorMessage: PASSWORD_SHOULD_BE_AT_LEAST_8_CHARACTERS_LONG
    },

] 

export const fieldTestRegistrationData: RegistrationData  = {
    name: "John Doe",
    email: "random@email.com",
    confirmEmail: "random@email.com",
    postalCode: 3200,
    password: "asdasd123123",
    confirmPassword: "asdasd123123"
}