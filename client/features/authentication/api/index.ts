// import axios from 'axios';

// const BACKEND_URL = 'http://localhost/';

// export default class LoginApi {
//   static loginUser() {
//     const queryUrl = 'login';
//     return axios.get(`${BACKEND_URL}${queryUrl}`).
//       then(_ => _.data);
//   }
// }

export default class LoginApi {
  static loginUser() {
    return { FullName: 'Fake user' };
  }
}
