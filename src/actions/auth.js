import {SIGN_IN} from './types';
import {SIGN_OUT} from './types';

export const signIn = user => ({
  type: SIGN_IN,
  data: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
