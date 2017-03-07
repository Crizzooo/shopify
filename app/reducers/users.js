import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_USERS';
const REMOVE = 'REMOVE_USER';
const UPDATE = 'UPDATE_USER';


/* ------------   ACTION CREATORS     ------------------ */

const init = users => ({ type: INITIALIZE, users });
const remove = id => ({ type: REMOVE, id });
const update = user  => ({ type: UPDATE, user });


/* ------------       REDUCER     ------------------ */

export default function reducer (state = [], action) {

  switch (action.type) {

    case INITIALIZE:
      return action.users;

    case REMOVE:
      return state.filter(user => user.id !== action.id);

    case UPDATE:
      return state.map(user => (
        action.user.id === user.id ? action.user : user
      ));

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
      .then(res => dispatch(init(res.data)));
};

// optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const updateUser = (id, user) => dispatch => {
  console.log('updating user at id', id, 'to ', user);
  axios.put(`/api/users/${id}`, user)
      .then(res => {
        console.log('reached updateUser')
        dispatch(update(res.data))
      })
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};
