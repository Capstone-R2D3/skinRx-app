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

export const getRecommendations = (userId, skinTypeId) => async dispatch => {
  try {
    const {data} = await axios.post(`https://skinrx-server.herokuapp.com/api/recommendations/${userId}`, {skinTypeId})
    dispatch(gotRecommendations(data))
  } catch (error) {
    console.log(error)
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
