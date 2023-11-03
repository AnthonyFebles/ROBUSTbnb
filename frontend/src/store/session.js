import { csrfFetch } from "./csrf";

export const SET_USER = 'session/SET_USER'
export const REMOVE_USER = 'session/REMOVE_USER'


export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const removeUser = () => ({
	type: REMOVE_USER,
	
});


export const logIn = (user) => async (dispatch) => {
    const {credential, password} = user
	const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });

	
		const data = await res.json();
		dispatch(setUser(data));
		
	

	return res;
};

export const signUp = (user) => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user
    const res = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        }),
    })

    const data = await res.json()
    dispatch(setUser(data.user))
    return res
}

export const restoreUser = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session')
    const data = await res.json()
    dispatch(setUser(data.user))

    return res
}

export const logOut = () => async (dispatch) => {
    const res = await csrfFetch('api/session', {
        method: "DELETE"
    })
    
    dispatch(removeUser())

    return res
}

const sessionReducer = (state = { user: null }, action) => {
    
	switch (action.type) {
        case SET_USER: {
            const newState = {...state}
            newState.user = action.payload
            return newState
        }
        case REMOVE_USER : {
            const newState = { ...state };
            newState.user = null
            return newState
        }
		default:
			return state;
	}
};

export default sessionReducer