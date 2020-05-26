import axios from 'axios';

export default axios.create({
	baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/',
	headers: {
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
		"useQueryString":true,
	}
});