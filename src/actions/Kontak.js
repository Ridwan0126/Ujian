import {CONTACT} from './types';

export const storeContactList = contactList => ({
  type: CONTACT,
  data: contactList,
});
