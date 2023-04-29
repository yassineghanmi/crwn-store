import { call, put, takeLatest, all } from "redux-saga/effects";
import { signInFailed, signInSuccess, signUpFailed } from "./userAction";
import {
  SignInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/Firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    //console.log(userSnapshot);
    //console.log(userSnapshot.data());
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    //console.log(userAuth);
    if (!userAuth) {
      return;
    }
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(SignInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    //console.log(email, password);
    const { user } = yield call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    //console.log(user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
      displayName
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest("EMAIL_SIGN_IN_START", signInWithEmail);
}
export function* onGoogleSignInStart() {
  yield takeLatest("GOOGLE_SIGN_IN_START", signInWithGoogle);
}
export function* onCheckUserSession() {
  yield takeLatest("CHECK_USER_SESSION", isUserAuthenticated);
}
export function* onSignUpStart() {
  yield takeLatest("EMAIL_SIGN_UP_START", signUp);
}

export function* userSage() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
  ]);
}
