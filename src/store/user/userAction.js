//userAction
export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
export const checkUserSession = () => ({
  type: "CHECK_USER_SESSION",
});

//SIGN_IN_ACTION

export const googleSignInStart = () => ({
  type: "GOOGLE_SIGN_IN_START",
});
export const emailSignInStart = (email, password) => ({
  type: "EMAIL_SIGN_IN_START",
  payload: { email, password },
});
export const signInSuccess = (user) => ({
  type: "SIGN_IN_SUCCESS",
  payload: user,
});
export const signInFailed = (error) => ({
  type: "SIGN_IN_FAILED",
  payload: error,
});

//SIGN_UP_ACTION

export const emailSignUpStart = (email, password, displayName) => ({
  type: "EMAIL_SIGN_UP_START",
  payload: { email, password, displayName },
});
export const signUpFailed = (error) => ({
  type: "SIGN_UP_FAILED",
  payload: error,
});
