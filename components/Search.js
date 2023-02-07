import PizzaPath from './PizzaPath';
import { findPaths } from '../utils/findPaths';
import { distance, deg2rad } from '../utils/distance';
import axios from 'axios';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import UserMap from './UserMap';

import { BiWalk } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';

import {
  BsFillCheckSquareFill,
  BsFillXSquareFill,
  BsFillQuestionSquareFill,
} from 'react-icons/bs';

const Search = () => {
  const [pathOptions, setOptions] = useState('');
  const [pathNumber, setPathNumber] = useState(0);
  const [userCoords, setUserCoords] = useState([]);
  const [locationFound, setLocation] = useState(false);
  const [pathType, setPathType] = useState('');

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
        'In order to search you must share your location or enter an address, select how many slices you desire, and select your total path maximum distance.'
      );
    }
  };
  return (
    <>
      {/* {!pathOptions && (
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
      )} */}

      {!pathOptions && (
        <div className='w-full flex flex-col items-center'>
          <div className='w-full max-w-[800px] bg-containerColor text-sm md:text-xl rounded-md border border-[#eaeaea] mt-2'>
            <div className=' flex flex-row justify-around mb-6 md:mb-8'>
              <div className='flex flex-col items-center '>
                <BiWalk className='min-w-[100px] min-h-[100px] md:min-w-[150px] md:min-h-[150px]' />
                I&apos;m walking
                <input
                  className='h-4 w-4 mb-8'
                  type='radio'
                  value='walking'
                  name='transport'
                  onClick={() => setPathType('walking')}
                />
                <div className='flex flex-col items-center '>
                  <BsFillQuestionSquareFill className='min-w-[50px] min-h-[50px]' />
                  From my location
                  <input
                    type='radio'
                    className='h-4 w-4'
                    value='gps'
                    name='pathLocation'
                    onClick={() => setPathType('walking')}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <AiFillCar className='min-w-[100px] min-h-[100px] md:min-w-[150px] md:min-h-[150px]' />
                I&apos;m driving
                <input
                  type='radio'
                  className='h-4 w-4 mb-8'
                  value='driving'
                  name='transport'
                  onClick={() => setPathType('driving')}
                />
                <div className='flex flex-col items-center'>
                  <input
                    className='rounded-md p-2 min-h-[50px]'
                    placeholder='&nbsp; Address and area code'
                  />
                  From this location
                  <input
                    type='radio'
                    className='h-4 w-4'
                    value='address'
                    name='pathLocation'
                    onClick={() => setPathType('driving')}
                  />
                </div>
              </div>
            </div>
            {/*
            <div className=' flex flex-row justify-around mb-8'>
              <div className='flex flex-col items-center '>
                <BsFillQuestionSquareFill className='min-w-[50px] min-h-[50px]' />
                From my location
                <input
                  type='radio'
                  className='h-4 w-4'
                  value='gps'
                  name='pathLocation'
                  onClick={() => setPathType('walking')}
                />
              </div>

              <div className='flex flex-col items-center'>
                <input
                  className='rounded-md p-2'
                  placeholder='&nbsp; Address and area code'
                />
                From this location
                <input
                  type='radio'
                  className='h-4 w-4'
                  value='address'
                  name='pathLocation'
                  onClick={() => setPathType('driving')}
                />
              </div>
            </div> */}

            {/* <div className=' flex flex-row justify-around mb-8'> */}
            <div className='grid grid-cols-2 md:grid-cols-3'>
              <div className='flex flex-col items-center col-span-1 md:col-span-1'>
                I want:
                <select className='rounded-md text-center p-2 '>
                  <option defaultValue='' disabled selected>
                    Slices Desired
                  </option>
                  <option value='1'>🍕</option>
                  <option value='2'>🍕 🍕</option>
                  <option value='3'>🍕 🍕 🍕</option>
                  <option value='4'>🍕 🍕 🍕 🍕</option>
                </select>
              </div>
              <div className='flex flex-col items-center col-span-1 md:col-span-1'>
                Within:
                {pathType === '' && (
                  <select className='rounded-md text-center p-2'>
                    <option defaultValue='' disabled selected>
                      Path Distance
                    </option>
                  </select>
                )}
                {pathType === 'walking' && (
                  <select className='rounded-md text-center p-2'>
                    <option defaultValue='' disabled selected>
                      Path Distance
                    </option>
                    <option value='400'>5 blocks</option>
                    <option value='800'>10 blocks</option>
                    <option value='1200'>15 blocks</option>
                    <option value='1609'>1 mile</option>
                    <option value='3218'>2 miles</option>
                  </select>
                )}
                {pathType === 'driving' && (
                  <select className='rounded-md text-center p-2'>
                    <option defaultValue='' disabled selected>
                      Path Distance
                    </option>
                    <option value='1609'>1 mile</option>
                    <option value='3218'>2 miles</option>
                    <option value='16090'>10 miles</option>
                    <option value='32180'>20 miles</option>
                  </select>
                )}
              </div>
              <div className='flex flex-col items-center col-span-2 md:col-span-1 mt-2 md:mt-0'>
                Sorted by:
                <select className='rounded-md text-center p-2'>
                  <option value='default'>Magic</option>
                  <option value='closest'>Closest</option>
                  <option value='rating'>Highest Rated</option>
                  <option value='reviews'>Most Reviewed</option>
                </select>
              </div>
            </div>
            <div className='flex flex-row items-center justify-center mb-2'>
              <button className='p-2 mb-2 mt-4 bg-red-700 rounded-md border border-black'>
                Find my path
              </button>
            </div>
          </div>
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
