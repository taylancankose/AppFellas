import * as yup from "yup";

export const RegisterUserValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name must be at least 4 characters long")
    .max(50, "Name is too long"),
  email: yup
    .string()
    .required("Email is missing")
    .email("Invalid email address"),
  password: yup
    .string()
    .trim()
    .required("Password is necessary")
    .min(4, "Password must be at least 4 characters long")
    .max(20, "Password is too long"),
});

export const LoginVerification = yup.object().shape({
  email: yup
    .string()
    .required("Email is missing")
    .email("Invalid email domain!"),
  password: yup.string().trim().required("You need to provide a password"),
});
