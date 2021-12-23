import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import './Carousel.css'

const Carousel = () => {
	const [trending, setTrending] = useState([]);

	const fetchTrendingCoins = async() =>{
		const { data } = await axios.get(TrendingCoins());
		setTrending(data);
	}

	useEffect(() => {
		fetchTrendingCoins();
	}, [])

	const items = trending.map((coin) => { 

		return(
			<Link className="carouselItem" to={`/coins/${coin.id}`} >
					<img 
						src={coin?.image}
						alt={coin.name}
						height="80"
					/>
					<p>{coin.symbol?.toUpperCase()}
					&nbsp;
					</p>
					{coin.price_change_percentage_24h < 0 ?(
								<p className="red">{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)
								:(
								<p className="green">+{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)	
							}
						{/*<p className="red">{profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%</p>*/}
					<p>{coin.current_price?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}</p>
			</Link>
			)
	})

	const responsive ={
		0:{
			items:2,
		},
		512:{
			items:4,
		}
	}

	return (
		<div className="carousel">
			<AliceCarousel 
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls 
				responsive={responsive} 
				autoPlay
				items={items}
			/>
		</div>
	)
}

export default Carousel