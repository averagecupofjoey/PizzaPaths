const PizzaPopUp = (
  locationName,
  locationImage,
  locationAddress,
  yelpRating
) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(locationAddress);
  };
  return (
    <div className='pizzaPopup'>
      <h1>{locationName}</h1>
      <img className='img-in-popup' src={locationImage} alt='pizza Image' />
      <h2>{locationAddress}</h2>
      <h3>Yelp rating: {yelpRating}</h3>
      <button onClick={() => copyAddress()}></button>
    </div>
  );
};

export default PizzaPopUp;
