import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotDetails from "./components/SpotDetails";
import NewSpot from "./components/NewSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/spots/current">
						<ManageSpots />
					</Route>
					<Route path="/spots/new">
						<NewSpot />
					</Route>
					<Route path="/spots/:spotId/edit">
						<UpdateSpot />
					</Route>
					<Route path="/spots/:spotId">
						<SpotDetails />
					</Route>
					<Route exact path="/">
						<AllSpots />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
