import PizzaPath from './PizzaPath';
import { findPaths } from '../utils/findPaths';
import { distance, deg2rad } from '../utils/distance';
import axios from 'axios';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import UserMap from './UserMap';

const Search = () => {
  const [pathOptions, setOptions] = useState('');
  const [pathNumber, setPathNumber] = useState(0);
  const [userCoords, setUserCoords] = useState([]);
  const generateNewPath = () => {
    if (pathOptions[Number(slices.value)].length >= 1) {
      let newNum =
        Math.ceil(Math.random() * pathOptions[Number(slices.value)].length) - 1;
      console.log(newNum);
      return newNum;
    }
  };

  // const [sliceOptions, setSlices] = useState('');
  const [latitude, longitude] = userCoords;
  let userLatitude;
  let userLongitude;
  const searchPaths = async (event) => {
    event.preventDefault();
    // making our Yelp fetch here with defined long & lat
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      slices.value !== '' &&
      pathDistance.value !== ''
    ) {
      console.log('Passing if statement');
      let response = await axios.get(
        `/api/fetchPizza?latitude=${latitude}&longitude=${longitude}&pathDistance=${pathDistance.value}`
      );

      let beginCoords = [latitude, longitude];
      let paths = response.data;
      let possiblePaths = findPaths(paths, pathDistance.value, beginCoords);
      console.log('***** SLICES ON SEARCH.JS', slices.value);
      setOptions(possiblePaths);
      // setUserCoords(beginCoords);
      // setSlices(slices.value);

      // return <PizzaPath pizzaData={possiblePaths} numSlices={slices.value} />;
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
      {!pathOptions && (
        <>
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(onSuccess, onError);
              function onSuccess(position) {
                console.log('COORDS POSITION', position.coords);
                const { latitude, longitude } = position.coords;
                setUserCoords([latitude, longitude]);
                // userLatitude = userCoords[0];
                // userLongitude = userCoords[1];
                userLatitude = latitude;
                userLongitude = longitude;
                // userLocation.value = `${userLatitude}, ${userLongitude}`;
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
              <option value='16090'>200 blocks/10 miles</option>
              <option value='32180'>400 blocks/20 miles</option>
            </select>
            <br />
            <button type='submit'>Find my path!</button>
          </form>
        </>
      )}

      {pathOptions && (
        <>
          <PizzaPath
            pizzaData={pathOptions}
            numSlices={slices.value}
            pathNum={pathNumber}
          />
          <UserMap startCoords={userCoords} />
          <button
            onClick={() => {
              setPathNumber(generateNewPath());
              // console.log(pathOptions);
            }}
          >
            Give me another path!
          </button>
          <select name='slices' id='slices'>
            {/* <option value=''>Slices Desired</option> */}
            <option value='1'>1 slice</option>
            <option value='2'>2 slices</option>
            <option value='3'>3 slices</option>
            <option value='4'>4 slices</option>
          </select>
        </>
      )}
    </div>
  );
};

export default Search;
