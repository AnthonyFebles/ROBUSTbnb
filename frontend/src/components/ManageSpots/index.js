import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageSpots.css";
import { getUserSpots } from "../../store/userSpot";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";

const ManageSpots = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const spot = useSelector((state) => {
		//console.log(state, "console.log the state inside manage spots");
		return state.userSpots.userList.map((spotId) => state.userSpots[spotId]);
	});

	//console.log(spot, "console.log spot from use selector");

	useEffect(() => {
		dispatch(getUserSpots());
	}, [dispatch]);

	const handleNewSpot = () => {
		history.push("/spots/new");
	};

	//console.log(spot, 'spot')

	// if (!spot) {

	// 	return (
	//         <div className="outer-div-manage">
	// 			<h1 className="manage-spots-header">Manage Your Spots</h1>
	//         <button onClick={handleNewSpot} >Create New Spot</button>
	//         </div>
	//     )
	// }

	const handleUpdate = (spot) => {
		history.push({
			pathname: `/spots/${spot.id}/edit`,
			state: {
				prop1: spot,
			},
		});
	};

	return (
		<>
			<div className="outer-div-manage">
				<h1 className="manage-spots-header">Manage Your Spots</h1>
				<nav>
					{spot.length ? (
						spot.toReversed().map((spot) => {
							return (
								<div key={spot.id} className="all-spots">
									<NavLink to={`/spots/${spot.id}`}>
										<div className="thumbnail-container">
											<div>
												<img
													src={`${spot.previewImage}`}
													alt="Spot Preview Image"
													className="thumbnail-image"
													title={`${spot.name}`}
												/>
											</div>
											<div className="thumbnail">
												<div className="secondary-text">
													{spot.avgRating == 0 ? (
														<>
															<div className="address-text">
																{spot.city}, {spot.state}
															</div>
															<div className="star-text">
																<i className="fa-solid fa-star"></i> New {"   "}{" "}
															</div>
															<div className="price-text">
																<b>${spot.price}</b> night
															</div>
														</>
													) : (
														<>
															<div className="address-text">
																{spot.city}, {spot.state}
															</div>
															<div className="star-text">
																<i className="fa-solid fa-star"></i>{" "}
																{spot.avgRating}{" "}
															</div>
															<div className="price-text">
																<b>${spot.price}</b> night
															</div>
														</>
													)}
												</div>
											</div>
										</div>
									</NavLink>
									<div className="update-delete-container">
										<span className="update-delete-buttons">
											<button
												className="update"
												onClick={() => handleUpdate(spot)}
											>
												{" "}
												Update{" "}
											</button>{" "}
											<OpenModalButton
											className={"delete-button"}
												buttonText="Delete"
												modalComponent={<DeleteSpotModal spotId={spot.id} />}
											/>
										</span>
									</div>
								</div>
							);
						})
					) : (
						<>
							<div className="outer-div-manage">
								<button onClick={handleNewSpot}>Create New Spot</button>
							</div>
						</>
					)}
				</nav>
			</div>
		</>
	);
};

export default ManageSpots;
