import axios from 'axios';

const GOT_ENTRIES = 'GOT_ENTRIES';

const gotEntries = (entries) => ({
    type: GOT_ENTRIES,
    entries
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
        await fetch(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: newEntry
        });
        dispatch(getEntries(userId));
    } catch (error) {
        console.error(error);
    }
}

export const updateEntry = (userId, entryId, updatedFields) => async dispatch => {
    try {
        await fetch(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries/${entryId}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            method: 'PUT',
            body: updatedFields
        });
        dispatch(getEntries(userId));
    } catch (error) {
        console.error(error);
    }
}

export const deleteEntry = (userId, entryId) => async dispatch => {
    try {
        await axios.delete(`https://skinrx-server.herokuapp.com/auth/users/${userId}/entries/${entryId}`);
        dispatch(getEntries(userId));
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
        default:
            return state
    }
}

export default journey;
