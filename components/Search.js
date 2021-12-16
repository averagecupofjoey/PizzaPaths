import PizzaPath from './PizzaPath';
import { findPaths } from '../utils/findPaths';
import { distance, deg2rad } from '../utils/distance';
import axios from 'axios';
import { useState } from 'react';

const Search = () => {
  // const [count, setCount] = useState(0);
  let userLatitude;
  let userLongitude;
  const searchPaths = async (event) => {
    event.preventDefault();
    // making our Yelp fetch here with defined long & lat
    if (
      userLatitude !== undefined &&
      userLongitude !== undefined &&
      slices.value !== '' &&
      distance.value !== ''
    ) {
      console.log('Passing if statement');
      let response = await axios.get(
        `/api/fetchPizza?latitude=${userLatitude}&longitude=${userLongitude}&pathDistance=${pathDistance.value}`
      );

      let paths = response.data;
      let possiblePaths = findPaths(paths);
      return <PizzaPath pizzaData={possiblePaths} numSlices={slices.value} />;
    }

    // console.log(
    //   'Coords:',
    //   userLocation.value,
    //   'Slices:',
    //   slices.value,
    //   'Distance:',
    //   pathDistance.value
    // );
  };
  return (
    <div>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
          function onSuccess(position) {
            const { latitude, longitude } = position.coords;
            userLatitude = latitude;
            userLongitude = longitude;
            userLocation.value = `${latitude}, ${longitude}`;
          }
          function onError() {
            window.alert('You must allow geolocation to use this feature.');
          }
        }}
      >
        Get your exact location
      </button>
      <form onSubmit={searchPaths}>
        <input
          type='text'
          name='userLocation'
          id='userLocation'
          placeholder='location'
        ></input>
        <select name='slices' id='slices'>
          <option value=''>Slices Desired</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
        <select name='pathDistance' id='pathDistance'>
          <option value=''>Path Distance</option>
          <option value='400'>5 blocks</option>
          <option value='800'>10 blocks</option>
          <option value='1609'>20 blocks/1 mile</option>
        </select>
        <br />
        <button type='submit'>Find my path!</button>
      </form>
    </div>
  );
};

export default Search;
