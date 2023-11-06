import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../store/spots";
import { Dispatch } from "react";
import { getSpots } from "../../store/spots";

const SpotDetails = () => {

    
    const dispatch = useDispatch();

    let { spotId } = useParams();
		
    useEffect(() => {
			dispatch(getOne(spotId));
		}, [dispatch]);

        
	
	//console.log('spotId', spotId)
    
	const Spot = useSelector((state) => state.spots[spotId]);
	console.log(Spot, 'spot state', spotId, 'spot ID',)
	



	if (!Spot) {
		console.log('no Spot')
		return null;
	}

	let content = null;

	
		content = (
			<div className="Spot-detail-lists">
				<div>
					<h2>Information</h2>
					<ul>
						<li>
							<b>Name</b> {Spot.name}
						</li>
						<li>
							<b>Location</b> {Spot.city} {Spot.state} {Spot.country}
						</li>
						<li>
							<b>Hosted By</b> {Spot.Owner[0].firstName}{" "}
							{Spot.Owner[0].lastName}
						</li>
						<li>
							<b>Description</b> {Spot.description}
						</li>
                        <li>
                            <b>Price</b> ${Spot.price} Night
                        </li>
						<li>
							{/* <b>Moves</b>
							<ul>
								{Spot.moves &&
									Spot.moves.map((move, i) => <li key={move + i}>{move}</li>)}
							</ul> */}
						</li>
					</ul>
				</div>
				<div>
					<button onClick={() => alert("Feature coming soon")}>Reserve</button>
				</div>
			</div>
		);
	

	return (
		<div className="Spot-detail">
            <h1>Hello from details</h1>
			<div className={`Spot-detail-image-background`}>
				<div
					className="Spot-detail-image"
					style={{ backgroundImage: `url('${Spot.imageUrl}')` }}
				></div>
				<div>
					{/* <h1 className="bigger">{Spot.name}</h1>
					{!showEditPokeForm && Spot.captured && (
						<button onClick={() => setShowEditPokeForm(true)}>Edit</button>
					)} */}
				</div>
			</div>
			{content}
		</div>
	);
};

export default SpotDetails;
