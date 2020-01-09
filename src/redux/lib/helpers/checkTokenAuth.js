import jwt_decode from 'jwt-decode';
import setAuthToken from '../Axios/setAuthToken';
import { setAuthSuccessUser, logout } from '../../actions/authUserAction';

const checkTokenAuth = (store) => {

  let jwtToken = localStorage.getItem('jwtToken');

  let decoded;
  if (jwtToken) {

    setAuthToken(jwtToken);
    decoded = jwt_decode(jwtToken);
    store.dispatch(setAuthSuccessUser(jwtToken));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/sign-in';
    }
  }
}

export default checkTokenAuth;