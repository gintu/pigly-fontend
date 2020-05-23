import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { authSuccess, authFail } from "../actions";

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

function* authenticate(data) {
  let result = yield call(fetcher, data.payload);

  if (!!result.data.error) {
    yield console.log(result.data.error.message);
    yield put(authFail({ error: result.data.error.message }));
  } else {
    localStorage.setItem("tokenId", result.data.idToken);
    localStorage.setItem("userId", result.data.localId);
    let expiresIn = Date.now() + result.data.expiresIn * 100;
    localStorage.setItem("expiresIn", expiresIn);
    let payload = {
      token: result.data.idToken,
      userId: result.data.localId
    };
    yield put(authSuccess(payload));
  }
}
export default function* authReducer() {
  yield takeEvery("AUTH_START", authenticate);
}
