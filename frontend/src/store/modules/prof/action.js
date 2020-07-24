export const updateProfRequest = (data) => {
  return {
    type: '@prof/UPDATE_PROF_REQUEST',
    payload: { data },
  };
};

export const updateProfileRequest = (data) => {
  return {
    type: '@prof/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
};

export function updateProfileSuccess(profile) {
  return {
    type: '@prof/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@prof/UPDATE_PROFILE_FAILURE',
  };
}
