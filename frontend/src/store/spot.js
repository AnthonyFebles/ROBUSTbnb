import { csrfFetch } from "./csrf";
const CREATE_SPOT = "spot/CREATE_Spot";
const UPDATE_SPOT = "spot/UPDATE_Spot";
const DELETE_SPOT = "spot/DELETE";
const GET_ONE = "spot/GET_ONE";

const createSpot = (spot) => ({
	type: CREATE_SPOT,
	spot,
});

const updatedSpot = (spot) => ({
	type: UPDATE_SPOT,
	spot,
});

const getOneSpot = (spot) => ({
	type: GET_ONE,
	spot,
});



export const getOne = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`);
	//console.log(response, "asdhfbjlasdjbfioas")
	if (response.ok) {
		const Spot = await response.json();
		dispatch(getOneSpot(Spot));
		//.log(Spot, "this is the spot in getOne")
		return Spot;
	}

	return response;
};

export const createNewSpot = (spot) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(spot),
	});

	if (response.ok) {
		const newSpot = await response.json();
		dispatch(createSpot(newSpot));
		return newSpot;
	}

	return new Error("Failed to create Spot");
};

export const updateSpot = (spot) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spot.id}`, {
		method: "PUT",
		body: JSON.stringify(spot),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const Spot = await response.json();
		dispatch(updatedSpot(spot));
		return Spot;
	}

	return new Error("Failed to Update");
};





const SpotReducer = (state = {}, action) => {
	switch (action.type) {
		
		case GET_ONE:
			//console.log(action, "action", state, "state")

			return { 
				...state,
				...action.spot[0],
			};

		default:
			return state;

		
	}
};

export default SpotReducer;