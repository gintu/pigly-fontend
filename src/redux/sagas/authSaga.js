import { put, call, takeEvery, delay, fork, select } from "redux-saga/effects";
import axios from "axios";
import {
  authSuccess,
  authFail,
  commitLogout,
  initiateLogout,
  commitUserData,
  userDataFetchFail
} from "../actions";

export const getUserId = state => state.auth.userId;

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

async function fetchUserData(data) {
  try {
    let res = await axios.get(
      `https://friends-54db6.firebaseio.com/users.json?orderBy="userId"&startAt="${data}"&endAt="${data}"`
    );
    return res;
  } catch (err) {
    return err.response;
  }
}

async function saveToFirebase(data) {
  let user = {
    userId: data.id,
    name: data.name,
    knowMe: data.knowMe
  };
  let parsedUser = await JSON.stringify(user);
  console.log(parsedUser);

  try {
    let res = await axios.post(
      `https://friends-54db6.firebaseio.com/users.json`,
      parsedUser,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
}

function* saveUserData(data) {
  let id = yield select(getUserId);
  let result = yield call(saveToFirebase, { ...data.payload.formData, id });
  if (!!result.data.error) {
    yield console.log(result.data.error.message);
    yield put(userDataFetchFail({ error: result.data.error.message }));
  } else {
    yield put(commitUserData(data.payload.formData));
    yield data.payload.to.push("/chatlist");
  }
}

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
    if (data.payload.login) {
      let userData = yield call(fetchUserData, result.data.localId);
      if (!!userData.data.error) {
        yield console.log(userData.data.error.message);
        yield put(userDataFetchFail({ error: userData.data.error.message }));
      } else {
        let transformedUserData = yield userData.data[
          Object.keys(userData.data)[0]
        ];
        yield put(commitUserData(transformedUserData));
        yield data.payload.to.push("/chatlist");
      }
    } else {
      yield data.payload.to.push("/join");
    }
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
  yield takeEvery("INITIATE_SAVE_USER_DATA", saveUserData);
}
