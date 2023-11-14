import { csrfFetch } from "./csrf";
const LOAD = "userSpot/LOAD";
const CREATE_SPOT = "spot/CREATE_Spot";
const UPDATE_SPOT = "spot/UPDATE_Spot";
const DELETE_SPOT = "spot/DELETE";

const load = (userList) => ({
	type: LOAD,
	userList,
});




export const getUserSpots = () => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/current`);

	if (res.ok) {
        const userList = await res.json();
		console.log(userList, "res");
		dispatch(load(userList));
	}
	//console.log(res, "res");
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
			console.log(action, "console log the action")
			const allSpots = {};
			if (action.userList.Spots) {
				action.userList.Spots.forEach((spot) => {
					allSpots[spot.id] = spot;
				});
				console.log(action, "load action");
				return {
					...allSpots,
					...state,
					userList: sortList(action.userList.Spots),
				};
			} else
				return {
					...state,
                    userList: []
					
				};

		default:
            console.log('enter default')
			return state;
	}
};

export default UserSpotsReducer;
