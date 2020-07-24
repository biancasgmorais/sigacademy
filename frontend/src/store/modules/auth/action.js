export function signInRequest(registration, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { registration, password },
  };
}

export function signInSucess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, registration, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, registration, password },
  };
}
export function signFailure() {
  return { type: '@auth/SIGN_FAILURE' };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
