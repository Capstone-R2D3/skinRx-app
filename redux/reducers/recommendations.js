import axios from 'axios'

const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
const CLEAR_RECS = 'CLEAR_RECS' 

const gotRecommendations = recommendations => ({
  type: GET_RECOMMENDATIONS,
  recommendations
})

const clearedRecs = () => ({
  type: CLEAR_RECS
})

// for new users when they sign up only --> hook up to submit page 
export const getRecommendations = (userId, skinTypeId) => async dispatch => {
  try {
    // https://skinrx-server.herokuapp.com/api/recommendations/${userId}
    const {data} = await axios.post(`http://172.16.26.91:8080/api/recommendations/${userId}`, {skinTypeId})
    dispatch(gotRecommendations(data))
  } catch (error) {
    console.log(error)
  }
}

// for exisiting users  
export const getExistingUserRecs = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`http://172.16.26.91:8080/api/recommendations/${userId}`)
    dispatch(gotRecommendations(data))
  } catch (error) {
    console.error(error)
  }
}


export const getNewRecommendation = (userId, category, productId, skinTypeId, userRating) => async dispatch => {
  try {
    await axios.put(`http://172.16.26.91:8080/api/recommendations/${userId}`, {category, productId, skinTypeId, userRating})
    dispatch(getExistingUserRecs(userId))
  } catch (error) {
    console.error(error)
  }
}

export const clearRecs = () => async dispatch => {
  try {
    dispatch(clearedRecs())
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  recommendations: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return {...state, recommendations: [action.recommendations]}
    case CLEAR_RECS:
      return {...state, recommendations: []}
    default: 
      return state
  }
}
