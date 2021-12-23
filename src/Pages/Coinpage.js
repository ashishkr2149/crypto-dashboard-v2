import React,{ useState, useEffect } from 'react';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo/CoinInfo'
import axios from 'axios';
import './Coinpage.css';
const Coinpage = () => {

	const { id } = useParams();
	const [coin, setCoin] = useState();

	const fetchCoin = async() => {
		const { data } = await axios.get(SingleCoin(id));
		setCoin(data);
	}

	// console.log(coin)

	useEffect(() => {
		fetchCoin();
	}, [])

	const desc = coin?.description.en.split(". ")[0];

	if (!coin) return (
		<h1>LOADING...</h1>
		);

	return (
		<div className="container">
			<div className="side-bar">
				<img 
					className="coin-logo"
					src={coin?.image.large}
					alt={coin?.name}
					height="200"
				/>
				<h1>{coin?.name}</h1>
				<div className="desc-area">
					<p className="desc" dangerouslySetInnerHTML={{ __html: desc }} />
				</div>
				<div className="market-data">
					<div className="market-rank">
						<h3>Rank:</h3>
						&nbsp;&nbsp;
						<h3>{coin?.market_cap_rank}</h3>
					</div>	
					<div className="market-price">
						<h3>Current Price:</h3>
						&nbsp;&nbsp;
						<h3>{coin.market_data.current_price.inr?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}</h3>
					</div>	
					<div className="market-cap">
						<h3>Market Cap:</h3>
						&nbsp;&nbsp;
						<h3>{coin.market_data.market_cap.inr?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}</h3>
					</div>	
				</div>
			</div>
			{/*Chart*/}
			<CoinInfo coin={coin} />
		</div>
	)
}

export default Coinpage