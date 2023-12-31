import { csrfFetch } from "./csrf";
const LOAD = "userSpot/LOAD";
const DELETE_SPOT = "spot/DELETE";

const load = (userList) => ({
	type: LOAD,
	userList,
});
const removeSpot = (spotId) => ({
	type: DELETE_SPOT,
	spotId,
});

export const getUserSpots = () => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/current`);

	if (res.ok) {
		const userList = await res.json();
		//console.log(userList, "res");
		dispatch(load(userList));
	}
	//console.log(res, "res");
	return res;
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

const initialState = {
	userList: [],
};

const sortList = (list) => {
	return list
		.sort((SpotA, SpotB) => {
			return SpotA.id - SpotB.id;
		})
		.map((Spot) => Spot.id);
};

const UserSpotsReducer = (state = initialState, action) => {
	//console.log(action, "action console.log line 41 reducer")
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allSpots = {};
			if (action.userList.Spots) {
				action.userList.Spots.forEach((spot) => {
					allSpots[spot.id] = spot;
				});
				//console.log(action, "load action");
				return {
					...allSpots,
					...state,
					userList: sortList(action.userList.Spots),
				};
			} else
				return {
					...state,
					userList: [],
				};

		case DELETE_SPOT:
			//console.log(action, "action when deleting");
			//console.log(state, "state when deleting");
			const newState = { ...state };
			delete newState[action.spotId];
			const index = newState.userList.indexOf(action.spotId);
			const x = newState.userList.splice(index, 1);
			//console.log(newState, "newState when deleting a spot");
			//console.log(x, "index removed");
			return newState;

		default:
			//console.log('enter default')
			return state;
	}
};

export default UserSpotsReducer;
