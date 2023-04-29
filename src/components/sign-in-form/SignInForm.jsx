import React, { useEffect, useState } from "react";
import "./SignInForm.scss";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import {
  SignInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/Firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/userAction";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormfields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart(email,password));
    } catch (e) {
      //console.log(e.code);
      switch (e.code) {
        case "auth/wrong-password":
          alert("incorrect password please try again");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(e);
      }

      if (e.code === "auth/wrong-password") {
      } else if (e.code === "auth/user-not-found") {
      }
    }
  };

  const createGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormfields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onFormSubmit}>
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
        <div className="buttons-container">
          <Button type="submit" onClick={onFormSubmit}>
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={createGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
