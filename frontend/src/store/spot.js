import { csrfFetch } from "./csrf";
const CREATE_SPOT = "spot/CREATE_Spot";
const DELETE_SPOT = "spot/DELETE";
const GET_ONE = "spot/GET_ONE";

const createSpot = (spot) => ({
	type: CREATE_SPOT,
	spot,
});

const getOneSpot = (spot) => ({
	type: GET_ONE,
	spot,
});

const removeSpot = (spotId) => ({
	type: DELETE_SPOT,
	spotId,
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

export const updateSpot = (spot, spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "PUT",
		body: JSON.stringify(spot),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const Spot = await response.json();
		dispatch(createSpot(spot));
		return Spot;
	}

	return new Error("Failed to Update");
};

export const deleteSpot = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		const spot = await res.json();
		//console.log(spot, "res when deleting spot");
		dispatch(removeSpot(spotId));
		return spot;
	}

	return res;
};

const SpotReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ONE:
			//console.log(action, "action inside get one spot reducer");
			const newGet = {};
			return { ...newGet, ...action.spot[0] };

		case DELETE_SPOT:
			//console.log(action, "action when deleting");
			const newState = { ...state };
			delete newState[action.spotId];

			return newState;

		default:
			return state;
	}
};

export default SpotReducer;
