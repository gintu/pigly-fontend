import { put, call,takeEvery } from "redux-saga/effects";
import axios from 'axios'
import {authSuccess} from '../actions'

function fetcher(data){
  console.log(data)

   let config={
    returnSecureToken	:true,
    email:data.formData.email,
    password:data.formData.password
  }

  let url=''
  if(data.login){
       url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSKaZf0jaPmvN645vr0pQcugvPJi-gSLw`
  }
  else{
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSKaZf0jaPmvN645vr0pQcugvPJi-gSLw`

  }

  axios.post(url,config).then((res)=>{

    localStorage.setItem('tokenId',res.idToken)
    localStorage.setItem('userId',res.localId)
    let expiresIn = Date.now() + res.expiresIn*100
    localStorage.setItem('expiresIn',expiresIn)

    return {
      token:res.idToken,
      userId:res.localId

    }
  
  })
  .catch(err=>{
    console.log(err.error.message)
  })



}

function* authenticate(data) {
 let result = yield call(fetcher,data.payload);
 yield console.log(result)
 yield put(authSuccess(result))
}
export default function* authReducer() {
  yield takeEvery("AUTH_START", authenticate);
}
