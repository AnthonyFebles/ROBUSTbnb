import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../store/spots";
import { Dispatch } from "react";
import { getSpots } from "../../store/spots";
import { getReviews } from "../../store/reviews";

const SpotDetails = ()  => {

    
    const dispatch = useDispatch();

    let { spotId } = useParams();

    const [owner, setOwner] = useState('')
		
    useEffect(() => {
			dispatch(getOne(spotId));
            dispatch(getReviews(spotId))
		}, [dispatch]);

     useEffect(() => {
        const fetchOwner = async() => {
            const res = await fetch(`/api/spots/${spotId}`);

            if (res.ok) {
                const spot = await res.json()
                
                setOwner(spot[0].Owner[0])
            }
        }
        fetchOwner()
     }, [])   
	
	console.log(owner, "owner")
    
	const Spot =  useSelector( (state) =>{ return state.spots[spotId]});

    const Reviews = useSelector(state => {
      return state.reviews.list.map(spotId => state.reviews[spotId])
})    
    
    //console.log(Reviews, "full state")
	//console.log(Spot, 'spot state', spotId, 'spot ID',)
	
        


	if (!Spot) {
		//console.log('no Spot')
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
							<b>Hosted By</b>{" "}
							{owner === '' ? "Loading" : owner.firstName}{" "}
							{owner === '' ? "Please Refresh" : owner.lastName}
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
                    {Reviews.length !== 0 ? Reviews.map((element) => {
						return (
							<ul key={`${element.id}`}>
								<li> <b>Review</b> {element.review}</li>
								
							</ul>
						);
					}) :<><span>Leave A Review!</span> <textarea></textarea></>}
					
				</div>
				<div>
					<button onClick={() => alert("Feature coming soon")}>Reserve</button>
				</div>
			</div>
		);
	

	return (
		<div className="Spot-detail">
            
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
