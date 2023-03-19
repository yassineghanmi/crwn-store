import React, { useState } from "react";
import "./SignUpForm.scss";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/Firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormfields] = useState(defaultFormFields);

  const { displayName } = formFields;
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);
    if (formFields.password !== formFields.confirmPassword) {
      console.log("password not match");
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password,
        formFields.displayName
      );
      //console.log(user);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormfields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onFormSubmit}>
        <FormInput
          label={"Name"}
          type="text"
          name="displayName"
          value={formFields.displayName}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Email"}
          type="email"
          name="email"
          value={formFields.email}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          value={formFields.password}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          name="confirmPassword"
          value={formFields.confirmPassword}
          required
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
