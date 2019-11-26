import axios from 'axios';

const GOT_ENTRIES = 'GOT_ENTRIES';

const gotEntries = (entries) => ({
    type: GOT_ENTRIES,
    entries
})

export const getEntries = (userId) => async dispatch => {
    try {
        const entries = await axios.get(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries`);
        dispatch(gotEntries(entries));
    } catch (error) {
        console.error(error)
    }
}

const initialState = {
    entries: [],
    entry: {}
}

const journey = (state = initialState, action) => {
    switch (action.type) {
        case GOT_ENTRIES:
            return { ...state, entries: action.entries }
        default:
            return state
    }
}

export default journey;
