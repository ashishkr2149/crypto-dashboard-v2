import React,{ createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";

import axios from 'axios';

const Crypto =  createContext(); 

const CryptoContext = ({children}) => {

	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		type: "succes"
	})
	
	useEffect(() => {
		onAuthStateChanged(auth,user=>{
			if(user) setUser(user);
			else setUser(null);
		})
	}, [])

	const fetchCoins = async() => {
		setLoading(true)
		const { data } = await axios.get(CoinList());
		setCoins(data);
		setLoading(false)
	}

	return (
		<Crypto.Provider value={{coins, loading, fetchCoins, alert, setAlert, user}}>
			{children}
		</Crypto.Provider>
	)
}

export default CryptoContext;

export const CryptoState = () => {
	return useContext(Crypto);
}