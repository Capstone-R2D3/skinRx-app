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
      let { data } = await axios.get(`http://172.16.26.91:8080/api/reviews/${userId}/${productId}`)
      dispatch(gotRating(data[0]))
  } catch(error) {
      console.error(error)
  }
}

// thunks
export const addRating = (productId, userId, rating) => async dispatch => {
    try {
      let { data } = await axios.post(`http://172.16.26.91:8080/api/reviews`, {rating, productId, userId})
        dispatch(newRating(data.rating))
    } catch(error) {
        console.error(error)
    }
}

export const editRating = (productId, userId, rating) => async dispatch => {
  try {
    console.log('rating', rating)
    const {data} = await axios.put(`http://172.16.26.91:8080/api/reviews/update`, {rating, userId, productId})
    dispatch(editedRating(data.rating))
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