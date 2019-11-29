import axios from 'axios'

const GET_TOXICITY_SCORE = 'GET_TOXICITY_SCORE'

const gotToxicityScore = score => ({
  type: GET_TOXICITY_SCORE,
  score
})


export const getToxicityScore = productId => async dispatch => {
  const {data} = await axios.get(`https://skinrx-server.herokuapp.com/api/products/${productId}`)
  let totalToxicity = 0
  let len = data.ingredients.length
  let score
  data.ingredients.forEach((ingredient) => {
    if (ingredient === ' : ') {
      len = len - 1
    } else {
      score = ingredient.split(': ')
      score = score[1]
      totalToxicity += parseInt(score, 10)
    } 
  })
  score = totalToxicity / len
  dispatch(gotToxicityScore(Math.round(score)))
}

const initialState = {
  score: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOXICITY_SCORE: 
      return {...state, score: action.score}
    default: 
    return state
  }
}