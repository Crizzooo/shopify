import axios from 'axios'
import { create } from './users';

const AUTHENTICATED = 'AUTHENTICATED'

const reducer = (state = null, action) => {
  switch (action.type) {

    case AUTHENTICATED:
      return action.user

    default:
      return state
  }
}

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(() => dispatch(authenticated(null)))

// export const googleLogin = (username, password) =>
//   dispatch =>
//     axios.post('/api/auth/login/google',
//       {username, password})
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signup = user => dispatch => {
  console.log('signup route')
  console.log(user)

  axios.post('/api/auth/signup', user)
  .then(res => res.data)
  .then(user => {
    dispatch(create(user)); // so new user appears in our master list
    dispatch(authenticated(user)); // set current user
  })
  .catch(() => dispatch(create(user)))
};

export default reducer
