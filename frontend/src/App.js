import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import LoginFormPage from './components/LoginFormModal'
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotDetails from "./components/SpotDetails";

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
					<Route path='/spots/:spotId'>
						<SpotDetails/>
					</Route>
					<Route exact path='/'>
						<AllSpots/>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
