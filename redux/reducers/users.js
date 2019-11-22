import axios from 'axios'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// process.env.baseURL = 'https://skinrx-server.herokuapp.com'

const initialState = {
  user: {}
}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('https://skinrx-server.herokuapp.com/api/users/me');
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res
  console.log('email', email)
  try {
    console.log('hereeeee')
    res = await axios.post(`https://skinrx-server.herokuapp.com/api/users/${method}`, {email, password})
    console.log('response', res.data)
  } catch (authError) {
    console.log(authError)
  }
  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('https://skinrx-server.herokuapp.com/api/users/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return state
    default:
      return state
  }
}
