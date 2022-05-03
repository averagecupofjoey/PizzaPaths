import axios from 'axios';

const apiKey = process.env.API_key;
export default async function fetchPizza(req, res) {
  // console.log(req.query);
  const response = await axios.get(
    `https://api.yelp.com/v3/businesses/search?term=pizza+slice&latitude=${req.query.latitude}&longitude=${req.query.longitude}&radius=${req.query.pathDistance}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  res.send(response.data);
}
