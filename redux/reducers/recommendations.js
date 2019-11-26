import axios from 'axios'

const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'

const gotRecommendations = recommendations => ({
  type: GET_RECOMMENDATIONS,
  recommendations
})

export const getRecommendations = (userId) => async dispatch => {
  try {
    const {data} = await axios.post(`https://skinrx-server.herokuapp.com/api/recommendations/${userId}`)
    console.log('dataaaaa', data)
    dispatch(gotRecommendations(data))
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
    default: 
      return state
  }
}
