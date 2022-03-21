import axios from 'axios';

const apiKey = process.env.API_key;
export default async function fetchPizza(req, res) {
  // console.log(req.query);
  // console.log(apiKey);
  const response = await axios.get(
    `https://api.yelp.com/v3/businesses/search?term=pizza+slice&latitude=${req.query.latitude}&longitude=${req.query.longitude}&radius=${req.query.pathDistance}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        // 'Bearer 3fqLIjij6CnKDgiYDYByPGk218ZzvutZASJADGE8bY1bR_6QDgAfjdw_uTfcapaLiGdIPWEMX1t9LU0xtJDLcm_1nU876Qsg5v9ayG33LzMPOQY3InYhibCXZd24YXYx',
        // 'Access-Control-Allow-Origin': '*',
      },
      // mode: 'no-cors',
    }
  );
  res.send(response.data);
}
