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

export const auth = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`https://skinrx-server.herokuapp.com/auth/login`, {email, password})
    console.log('response data', res.data)
    dispatch(getUser(res.data))
  } catch (authError) {
    console.log(authError)
  }
}

export const signUp = (firstName, lastName, email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`https://skinrx-server.herokuapp.com/auth/signup`, {
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      password: password
    })
    dispatch(getUser(res.data))
  } catch (authError) {
    console.log(authError)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return state
    default:
      return state
  }
}
