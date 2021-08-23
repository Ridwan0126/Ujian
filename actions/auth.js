import {SIGN_IN} from './types';
import {SIGN_OUT} from './types';
import {EDIT_DATA} from './types';
export const signIn = user => ({
  type: SIGN_IN,
  data: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const editData = NewData => ({
  type: EDIT_DATA,
  data: NewData,
});
