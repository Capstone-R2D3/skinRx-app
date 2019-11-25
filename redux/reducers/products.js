import axios from 'axios'

const GET_TOXICITY_SCORE = 'GET_TOXICITY_SCORE'

const gotToxicityScore = score => ({
  type: GET_TOXICITY_SCORE,
  score
})

export const getToxicityScore = productId => async dispatch => {
  const {data} = await axios.get(`https://skinrx-server.herokuapp.com/api/products/${productId}`)
  const ingredients = data.ingredients
  let totalToxicity = 0
  let len = ingredients.length
  ingredients.forEach(ingredient => {
    if (ingredient === ':') {
      len = len - 1
    }
    totalToxicity += ingredients[ingredient]
  })
  let score = totalToxicity / len
  dispatch(gotToxicityScore(score))
}

const initialState = {
  recommended: [],
  score: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOXICITY_SCORE: 
      return action.score
    default: 
    return state
  }
}