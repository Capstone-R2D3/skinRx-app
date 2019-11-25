import axios from 'axios';


// action types
const ADD_RATING = 'ADD_RATING';

// action creators 
const newRating = (rating) => ({
    type: ADD_RATING,
    rating
})

// thunks
export const addRating = (productRating) => async dispatch => {
    try {
        // console.log('getting here', productRating);
        // ***** @@@ EDIT: UPDATE WITH HEROKU ROUTE!!! @@@ *****
        let { data } = await axios.post('/', {productRating})
        // dispatch(newRating(data.productRating))
    } catch(error) {
        console.error(error)
    }
}

// reducer and initial state 
const initialState = {
    review: null,
}

// *** @@@ Not sure if i will actually ever need this reducer... may remove in future 
export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_RATING:
            return action.rating;
        default:
            return state;
    }
}