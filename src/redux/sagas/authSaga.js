import { put, call, takeEvery, delay, fork } from "redux-saga/effects";
import axios from "axios";
import {
  authSuccess,
  authFail,
  commitLogout,
  initiateLogout
} from "../actions";

async function fetcher(data) {
  let config = {
    returnSecureToken: true,
    email: data.formData.email,
    password: data.formData.password
  };

  let url = "";
  if (data.login) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSKaZf0jaPmvN645vr0pQcugvPJi-gSLw`;
  } else {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSKaZf0jaPmvN645vr0pQcugvPJi-gSLw`;
  }
  try {
    let res = await axios.post(url, config);
    return res;
  } catch (err) {
    return err.response;
  }
}

// async function autoLogout(expiresIn){

//   await setTimeout(()=>{

//     yield put(initiateLogout)
//   },expiresIn*1000)
// }

function* autoLogout(timeout) {
  yield delay(timeout * 1000);
  yield put(initiateLogout());
}

function* authenticate(data) {
  let result = yield call(fetcher, data.payload);
  console.log(data);

  if (!!result.data.error) {
    yield console.log(result.data.error.message);
    yield put(authFail({ error: result.data.error.message }));
  } else {
    yield localStorage.setItem("tokenId", result.data.idToken);
    yield localStorage.setItem("userId", result.data.localId);
    let expiresIn = Date.now() + result.data.expiresIn * 1000;
    yield localStorage.setItem("expiresIn", expiresIn);
    let payload = {
      token: result.data.idToken,
      userId: result.data.localId,
      to: data.payload.to
    };
    yield fork(autoLogout, result.data.expiresIn);
    yield put(authSuccess(payload));
  }
}

function* logout() {
  yield localStorage.removeItem("tokenId");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expiresIn");
  yield put(commitLogout());
}

function* checkAuth() {
  let token = yield localStorage.getItem("token");
  let userId = yield localStorage.getItem("userId");
  let expiresIn = yield localStorage.getItem("expiresIn");

  if (token) {
    let currentTime = new Date.now();
    if (currentTime < expiresIn) {
      let remainingTime = expiresIn - currentTime;

      yield fork(autoLogout, remainingTime / 1000);
      let payload = {
        token,
        userId
      };
      yield put(authSuccess(payload));
    } else {
      yield put(initiateLogout);
    }
  }
}

export default function* authReducer() {
  yield takeEvery("AUTH_START", authenticate);
  yield takeEvery("INITIATE_LOGOUT", logout);
  yield takeEvery("CHECK_AUTH_STATUS", checkAuth);
}
