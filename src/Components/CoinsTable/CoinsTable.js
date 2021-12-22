import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import { CoinList } from '../../config/api';
import { Link } from 'react-router-dom';
import './CoinsTable.css';
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {

	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);

	const fetchCoins = async() => {
		setLoading(true)
		const { data } = await axios.get(CoinList());
		setCoins(data);
		setLoading(false)
	}

	useEffect(() => {
		fetchCoins();
	},[])

 	const navigate = useNavigate();

	if (!coins) return (
			<h1>LOADING...</h1>
			);


	const filteredcoins = coins.filter((c)=>
		c.name.toLowerCase().includes(search.toLowerCase())||c.symbol.toLowerCase().includes(search.toLowerCase())
	)

	const items = filteredcoins.slice((page-1)*10,(page-1)*10+10).map((coin) => { 
		return(
				<div className="coin-container"
					onClick={() => navigate (`/coins/${coin.id}`)}
                    key={coin.name}>
					<div className="coin-row">
						<div className="coin">
							<img
								src={coin?.image}
								alt={coin.name}/>
							<h1>{coin.name}</h1>
							<p className="coin-symbol">{coin.symbol?.toUpperCase()}</p>
						</div>
						<div className="coin-data">
							<p className="coin-price">{coin.current_price?.toLocaleString('en-IN', {style:'currency', currency:'INR'}) }</p>
							<p className="coin-volume">{coin.total_volume?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}
							</p>
							{coin.price_change_percentage_24h < 0 ?(
								<p className="coin-percent red">{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)
								:(
								<p className="coin-percent green">+{coin.price_change_percentage_24h?.toFixed(2)}%</p>
								)	
							}
							<p className="coin-marketcap">Mkt Cap:{coin.market_cap.toLocaleString('en-IN', {style:'currency', currency:'INR'})}</p>
						</div>
					</div>
				</div>
		)
	})
	return(
		<div className="list-container">
			<div className="coin-search">
    		    <h1 className="coin-text">Search a Currency</h1>
    		    <form>
    		    	<input 
    		      		type="text" 
    		      		className="coin-input" 
    		      		placeholder="Search" 
    		      		onChange={(event)=>setSearch(event.target.value)} 
    		    	/>
    		    </form>
    		</div>
    		<div>
				{items}
			</div>
		</div>
		)
}

export default CoinsTable