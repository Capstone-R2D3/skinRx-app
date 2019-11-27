 import axios from 'axios';


// action types
const ADD_RATING = 'ADD_RATING';
const GET_RATING = 'GET_RATING'
const EDIT_RATING = 'EDIT_RATING'

// action creators 
const newRating = (rating) => ({
    type: ADD_RATING,
    rating
})

const gotRating = (rating) => ({
  type: GET_RATING,
  rating
})

const editedRating = (rating) => ({
  type: EDIT_RATING,
  rating
})

export const getRating = (productId, userId) => async dispatch => {
  try {
      // ***** @@@ EDIT: UPDATE WITH HEROKU ROUTE!!! @@@ *****
      let { data } = await axios.get(`https://skinrx-server.herokuapp.com/api/reviews/${userId}/${productId}`)
      dispatch(gotRating(data[0]))
  } catch(error) {
      console.error(error)
  }
}

// thunks
export const addRating = (productId, userId, rating) => async dispatch => {
    try {
      let { data } = await axios.post(`https://skinrx-server.herokuapp.com/api/reviews`, {rating, productId, userId})
        dispatch(newRating(data.rating))
    } catch(error) {
        console.error(error)
    }
}

export const editRating = (productId, userId, rating) => async dispatch => {
  try {
    console.log('here')
    let { data } = await axios.put(`https://skinrx-server.herokuapp.com/api/reviews/${userId}/${productId}`, {rating})
    dispatch(editedRating(data))
  } catch (error) {
    console.log(error)
  }
}


// reducer and initial state 
const initialState = {
    rating: null,
}

// *** @@@ Not sure if i will actually ever need this reducer... may remove in future 
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_RATING: 
          return {...state, rating: action.rating}
        case ADD_RATING:
          return {...state, rating: action.rating}
        case EDIT_RATING: 
          return {...state, rating: action.rating}
        default:
            return state;
    }
}