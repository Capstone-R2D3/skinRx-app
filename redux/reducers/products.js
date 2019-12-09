import axios from 'axios'

const GET_TOXICITY_SCORE = 'GET_TOXICITY_SCORE'
const GET_PRODUCT = 'GET_PRODUCT'

const gotToxicityScore = score => ({
  type: GET_TOXICITY_SCORE,
  score
})

const gotProduct = product => ({
  type: GET_PRODUCT,
  product
})

export const getToxicityScore = productId => async dispatch => {
  try {
    const {data} = await axios.get(`https://skinrx-server.herokuapp.com/api/products/${productId}`)
    dispatch(gotToxicityScore(data.score))
  } catch (error) {
    console.error(error)
  }
}

export const getProduct = name => async dispatch => {
  try {
    const {data} = await axios.get(`https://skinrx-server.herokuapp.com/api/products/name?name=${name}`)
    dispatch(gotProduct(data[0]))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  score: 0,
  product: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOXICITY_SCORE: 
      return {...state, score: action.score}
    case GET_PRODUCT:
      return {...state, product: action.product}
    default: 
    return state
  }
}