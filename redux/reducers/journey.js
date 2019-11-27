import axios from 'axios';

const GOT_ENTRIES = 'GOT_ENTRIES';
const ADDED_ENTRY = 'ADDED_ENTRY';
const UPDATED_ENTRY = 'UPDATED_ENTRY';

const gotEntries = (entries) => ({
    type: GOT_ENTRIES,
    entries
})

const addedEntry = (entry) => ({
    type: ADDED_ENTRY,
    entry
})

const updatedEntry = (entry) => ({
    type: UPDATED_ENTRY,
    entry
})

export const getEntries = (userId) => async dispatch => {
    try {
        const {data} = await axios.get(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries`);
        dispatch(gotEntries(data));
    } catch (error) {
        console.error(error)
    }
}

export const addEntry = (userId, newEntry) => async dispatch => {
    try {
        const {data} = await axios.post(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries`, newEntry);
        dispatch(addedEntry(data));
    } catch (error) {
        console.error(error);
    }
}

export const updateEntry = (userId, entryId, updatedFields) => async dispatch => {
    try {
        const {data} = await axios.put(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries/${entryId}`, updatedFields);
        dispatch(updatedEntry(data));
    } catch (error) {
        console.error(error);
    }
}

export const deleteEntry = (userId, entryId) => async dispatch => {
    try {
        await axios.delete(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries/${entryId}`);
        dispatch(getEntries());
    } catch (error) {
        console.error(error);
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
        case ADDED_ENTRY:
            return {...state, entries: [...entries, action.entry]}
        case UPDATED_ENTRY:
            return { ...state, entries: [...state.entries, action.entry] }
        default:
            return state
    }
}

export default journey;
