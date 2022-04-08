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
  const [locationFound, setLocation] = useState(false);

  const toggleClass = () => {
    setLocation(!locationFound);
  };

  const generateNewPath = () => {
    if (pathOptions[Number(slices.value)].length >= 1) {
      let newNum =
        Math.ceil(Math.random() * pathOptions[Number(slices.value)].length) - 1;
      console.log(newNum);
      return newNum;
    }
  };

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
      let response = await axios.get(
        `/api/fetchPizza?latitude=${latitude}&longitude=${longitude}&pathDistance=${pathDistance.value}`
      );

      let beginCoords = [latitude, longitude];
      let paths = response.data;
      let possiblePaths = findPaths(paths, pathDistance.value, beginCoords);
      setOptions(possiblePaths);
    } else {
      window.alert(
        'In order to search you must share your location, select how many slices you desire, and select your total path maximum distance.'
      );
    }
  };
  return (
    <>
      {!pathOptions && (
        <div className='searchContainer'>
          <input
            className={locationFound ? 'success' : null}
            type='text'
            name='userLocation'
            id='userLocation'
            value={locationFound ? 'Location Found!' : 'Location Not Found'}
            readOnly
          ></input>
          <button
            onClick={() => {
              if (locationFound === false) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
                function onSuccess(position) {
                  const { latitude, longitude } = position.coords;
                  setUserCoords([latitude, longitude]);
                  userLatitude = latitude;
                  userLongitude = longitude;
                  userLocation.value = `${latitude}, ${longitude}`;
                  {
                    toggleClass();
                  }
                }
                function onError() {
                  window.alert(
                    'You must allow geolocation to use this feature. If on mobile, make sure your location services are turned on, and allow access for your internet browser.'
                  );
                }
              }
            }}
          >
            Get your exact location
          </button>
          <form onSubmit={searchPaths}>
            <div className='selectOptions'>
              <select className='selectLeft' name='slices' id='slices'>
                <option value=''>Slices Desired</option>
                <option value='1'>1 slice</option>
                <option value='2'>2 slices</option>
                <option value='3'>3 slices</option>
                <option value='4'>4 slices</option>
              </select>
              <select
                className='selectRight'
                name='pathDistance'
                id='pathDistance'
              >
                <option value=''>Path Distance</option>
                <option value='125'>1 block</option>
                <option value='400'>5 blocks</option>
                <option value='800'>10 blocks</option>
                <option value='1609'>1 mile</option>
                <option value='16090'>10 miles</option>
                <option value='32180'>20 miles</option>
              </select>
            </div>
            <button type='submit'>Find my path! </button>
          </form>
        </div>
      )}

      {pathOptions && (
        <>
          <UserMap
            startCoords={userCoords}
            pizzaData={pathOptions}
            numSlices={slices.value}
            pathNum={pathNumber}
          />
          <div className='alternativeSelect'>
            <button
              className='newPath'
              onClick={() => {
                setPathNumber(generateNewPath());
              }}
            >
              Give me another path!
            </button>
            <select name='slices' id='slices'>
              {pathOptions[1].length >= 1 && (
                <option value='1' selected={slices.value === '1'}>
                  1 slice
                </option>
              )}

              {pathOptions[2].length >= 1 && (
                <option value='2' selected={slices.value === '2'}>
                  2 slices
                </option>
              )}

              {pathOptions[3].length >= 1 && (
                <option value='3' selected={slices.value === '3'}>
                  3 slices
                </option>
              )}

              {pathOptions[4].length >= 1 && (
                <option value='4' selected={slices.value === '4'}>
                  4 slices
                </option>
              )}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
