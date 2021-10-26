import {logout} from '../../api/Auth';

export const doLogout = () => ({
  type: 'LOGOUT',
  payload: logout(),
});
