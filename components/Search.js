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

import spinner from '../public/assets/spinner.svg';
import Image from 'next/image';

const Search = () => {
  // for map loading
  const [pathOptions, setOptions] = useState('');
  const [pathNumber, setPathNumber] = useState(0);

  // first screen state
  const [pathType, setPathType] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  // second screen state
  const [locationType, setLocationType] = useState('');
  const [locationFound, setLocationFound] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCoords, setGpsCoords] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [userCoords, setUserCoords] = useState('');
  const [address, setAddress] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  // const [addressCoords, setAddressCoords] = useState('');

  //final screen state
  const [numSlices, setNumSlices] = useState('');
  const [pathDistance, setPathDistance] = useState('');
  const [searchSort, setSearchSort] = useState('');

  // state for google link
  const [googleLink, setGoogleLink] = useState('');

  //makes it so found GPS coords stay and only accessed once
  const toggleClass = () => {
    setLocationFound(true);
  };

  const generateNewPath = (sliceValue) => {
    // console.log('HELLO', sliceValue);
    if (pathOptions[Number(sliceValue)].length >= 1) {
      let newNum =
        Math.ceil(Math.random() * pathOptions[Number(sliceValue)].length) - 1;
      // console.log('newNum is', newNum);
      // console.log('Options length is', pathOptions[Number(sliceValue)].length);
      googleLink = `https://www.google.com/maps/dir/${latitude},+${longitude}`;
      let otherLink = `https://www.google.com/maps/dir/${latitude},+${longitude}`;

      for (let i = 0; i < sliceValue; i++) {
        console.log('&&&&', pathOptions[sliceValue][newNum][i]);
        googleLink = googleLink.concat(
          `/${pathOptions[sliceValue][newNum][i].coordinates.latitude},+${pathOptions[sliceValue][newNum][i].coordinates.longitude}`
        );

        otherLink = otherLink.concat(
          `/${pathOptions[sliceValue][newNum][i].name
            .replace(/ /g, '+')
            .replace(/\//g, '%2F')},${pathOptions[sliceValue][newNum][
            i
          ].location.address1
            .replace(/ /g, '+')
            .replace(/\//g, '%2F')}`
        );
        // console.log(otherLink);
        // console.log(googleLink);
        setGoogleLink(otherLink);
      }

      // console.log('FUCK', pathOptions[sliceValue][newNum]);
      return newNum;
    }
  };

  const updateAddress = (e) => {
    e.preventDefault;
    setAddress(e.target.value);
    if (address.length >= 3) {
      setInputDisabled(false);
    } else {
      setInputDisabled(true);
    }
  };

  // gets userGPS coords, sets loading spinner, alerts if geolocation is off
  const selectUserGps = () => {
    setLocationType('gps');
    setGpsLoading(true);
    if (locationFound === false) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      function onSuccess(position) {
        const { latitude, longitude } = position.coords;
        setGpsCoords([latitude, longitude]);
        {
          toggleClass();
        }
      }
      function onError() {
        window.alert(
          'You must allow geolocation to use this feature. Make sure your location services are turned on, and allow access for your internet browser through settings.'
        );
      }
    }
  };

  const [latitude, longitude] = userCoords;

  const searchPaths = async () => {
    // making our Yelp fetch here with defined long & lat
    if (
      latitude !== undefined &&
      longitude !== undefined
      // &&
      // slices.value !== '' &&
      // pathDistance.value !== ''
    ) {
      let response = await axios.get(
        `/api/fetchPizza?latitude=${latitude}&longitude=${longitude}&pathDistance=${pathDistance}`
      );

      // let beginCoords = [latitude, longitude];
      let paths = response.data;
      let possiblePaths = findPaths(paths, pathDistance, userCoords);
      setOptions(possiblePaths);
    } else {
      window.alert(
        'In order to search you must share your location or enter an address, select how many slices you desire, and select your total path maximum distance.'
      );
    }
  };

  const getAddressCoords = async () => {
    setAddressLoading(true);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${address}&format=json&limit=1`
    );

    const data = await response.json();

    let foundLatitude = data[0]?.lat ?? 0;
    let foundLongitude = data[0]?.lon ?? 0;

    setUserCoords([foundLatitude, foundLongitude]);
    setAddressLoading(false);
  };

  // let googleLink = `https://www.google.com/maps/dir/${latitude},+${longitude}`;
  // let googleLink;

  // for(let i = 1; i=slices.value; i++ ){
  //   console.log("o")
  // }
  // 'https://www.google.com/maps/dir/40.7659076,+-73.9920316/40.76388,+-73.98821/';
  return (
    <>
      {!pathOptions && (
        <div className='w-full flex flex-col items-center'>
          <div className='flex w-full max-w-[800px] bg-containerColor rounded-md border border-[#eaeaea] mt-2 min-h-[50vh] relative '>
            {!pathType && (
              // <div className='flex items-center flex-1'>
              <div className='flex flex-row items-center justify-around w-full'>
                <div className='flex flex-col items-center '>
                  <BiWalk className='min-w-[150px] min-h-[200px] md:min-w-[200px] md:min-h-[200px]' />
                  I&apos;m walking
                  <input
                    className='h-4 w-4 mb-8'
                    type='radio'
                    value='walking'
                    name='transport'
                    // onClick={() => setSelectedPath('walking')}
                    onClick={() => setPathType('walking')}
                  />
                </div>

                <div className='flex flex-col items-center'>
                  <AiFillCar className='min-w-[150px] min-h-[200px] md:min-w-[200px] md:min-h-[200px]' />
                  I&apos;m driving
                  <input
                    type='radio'
                    className='h-4 w-4 mb-8'
                    value='driving'
                    name='transport'
                    // onClick={() => setSelectedPath('driving')}
                    onClick={() => setPathType('driving')}
                  />
                </div>
                {/* </div> */}

                {/* {selectedPath !== '' && (
                  <div className='flex justify-center mb-4 ease-in duration-1000 absolute right-1 bottom-1'>
                    <button
                      className='px-4 py-2 bg-[#f30000] rounded-md'
                      onClick={() => setPathType(selectedPath)}
                    >
                      Next
                    </button>
                  </div>
                )} */}
              </div>
            )}

            {pathType && !userCoords && (
              // <div className='w-full h-full flex flex-row'>
              <div className='flex flex-row items-center justify-around w-full text-sm md:text-lg'>
                <div className='flex flex-col items-center '>
                  {gpsCoords !== '' && (
                    <BsFillCheckSquareFill className='min-w-[50px] min-h-[50px] text-green-700' />
                  )}
                  {gpsCoords === '' && gpsLoading === false && (
                    <BsFillQuestionSquareFill className='min-w-[50px] min-h-[50px]' />
                  )}
                  {gpsCoords === '' && gpsLoading === true && (
                    <Image
                      src={spinner}
                      alt='Loading Image'
                      className='rounded-md animate-spin'
                      width={50}
                      height={50}
                    ></Image>
                  )}
                  From my location
                  <input
                    type='radio'
                    className='h-4 w-4'
                    value='gps'
                    name='pathLocation'
                    onClick={() => selectUserGps()}
                  />
                </div>

                <div className='flex flex-col items-center'>
                  <input
                    className='rounded-md p-2 min-h-[50px]'
                    placeholder='&nbsp; Address and area code'
                    onChange={updateAddress}
                  />
                  From this location
                  <input
                    type='radio'
                    className='h-4 w-4'
                    value='address'
                    name='pathLocation'
                    disabled={inputDisabled}
                    onClick={() => setLocationType('address')}
                  />
                </div>
                {/* </div> */}
                {locationType !== '' && (
                  <div className='flex justify-center mb-4 ease-in duration-1000 absolute right-1 bottom-1'>
                    {locationType === 'gps' && gpsCoords === '' && (
                      <div>.... Loading</div>
                    )}
                    {locationType === 'gps' && gpsCoords !== '' && (
                      <button
                        className='px-4 py-2 bg-[#f30000] rounded-md'
                        onClick={() => setUserCoords(gpsCoords)}
                      >
                        Next GPS
                      </button>
                    )}

                    {locationType === 'address' &&
                      addressLoading === false &&
                      address !== '' && (
                        <button
                          className='px-4 py-2 bg-[#f30000] rounded-md'
                          onClick={() => getAddressCoords()}
                        >
                          Next Address
                        </button>
                      )}

                    {locationType === 'address' && addressLoading === true && (
                      <Image
                        src={spinner}
                        alt='Loading Image'
                        className='min-w-[50px] min-h-[50px] rounded-md animate-spin'
                      ></Image>
                    )}
                  </div>
                )}
                <div className='absolute left-1 bottom-1'>
                  <span
                    className='underline'
                    onClick={() => {
                      setPathType('');
                      setSelectedPath('');
                    }}
                  >
                    Go Back
                  </span>
                </div>
              </div>
            )}

            {pathType && userCoords && (
              <div className='flex flex-row items-center justify-around w-full text-sm md:text-lg'>
                <div className='grid grid-rows-4 h-full'>
                  {/* {!numSlices && ( */}
                  <div className='flex flex-col items-center justify-center row-span-1'>
                    I want:
                    <select
                      className='rounded-md text-center p-2 '
                      name='slices'
                      id='slices'
                      onChange={(e) => {
                        setNumSlices(e.target.value);
                      }}
                    >
                      <option defaultValue='' disabled>
                        Slices
                      </option>
                      <option value='1'>🍕</option>
                      <option value='2'>🍕 🍕</option>
                      <option value='3'>🍕 🍕 🍕</option>
                      <option value='4'>🍕 🍕 🍕 🍕</option>
                    </select>
                  </div>
                  {/* )} */}

                  {numSlices && (
                    <div className='flex flex-col items-center justify-center row-span-1'>
                      Within:
                      {pathType === 'walking' && (
                        <select
                          className='rounded-md text-center p-2 '
                          name='pathDistance'
                          id='pathDistance'
                          onChange={(e) => {
                            setPathDistance(e.target.value);
                          }}
                        >
                          <option defaultValue='' disabled>
                            Path Distance
                          </option>
                          <option value='400'>5 blocks</option>
                          <option value='800'>10 blocks</option>
                          <option value='1200'>15 blocks</option>
                          <option value='1609'>20 blocks</option>
                          <option value='2009'>25 blocks</option>
                          <option value='2409'>30 blocks</option>
                        </select>
                      )}
                      {pathType === 'driving' && (
                        <select
                          className='rounded-md text-center p-2'
                          name='pathDistance'
                          id='pathDistance'
                          onChange={(e) => {
                            setPathDistance(e.target.value);
                          }}
                        >
                          <option defaultValue='' disabled>
                            Path Distance
                          </option>
                          <option value='1609'>1 mile</option>
                          <option value='3218'>2 miles</option>
                          <option value='8045'>5 miles</option>
                          <option value='16090'>10 miles</option>
                          <option value='24135'>15 miles</option>
                          <option value='32180'>20 miles</option>
                        </select>
                      )}
                    </div>
                  )}
                  {pathDistance && (
                    <div className='flex flex-col items-center justify-center row-span-1'>
                      Sorted by:
                      <select
                        className='rounded-md text-center p-2 '
                        name='searchType'
                        id='searchType'
                        onChange={(e) => {
                          setSearchSort(e.target.value);
                        }}
                      >
                        <option value='default'>Magic</option>
                        <option value='closest'>Closest</option>
                        <option value='rating'>Highest Rated</option>
                        <option value='reviews'>Most Reviewed</option>
                      </select>
                    </div>
                  )}
                  {numSlices && pathDistance && searchSort && (
                    <div className='flex items-center justify-center row-span-1'>
                      <button
                        className='p-2 rounded bg-slate-300'
                        onClick={() => searchPaths()}
                      >
                        Find My Path
                      </button>
                    </div>
                  )}
                </div>
                <div className='absolute left-1 bottom-1'>
                  <span
                    className='underline'
                    onClick={() => {
                      setUserCoords('');
                      setLocationType('');
                      setNumSlices('');
                      setPathDistance('');
                      setSearchSort('');
                      setAddress('');
                    }}
                  >
                    Go Back
                  </span>
                </div>
              </div>
            )}
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
          <div className='flex flex-col items-center'>
            <button
              className='p-2 bg-slate-400'
              onClick={() => {
                setPathNumber(generateNewPath(slices.value));
              }}
            >
              Give me another path!
            </button>
            <select
              name='slices'
              id='slices'
              // onChange={(e) => setNumSlices(e.target.value)}
            >
              {pathOptions[1].length >= 1 && (
                <option value='1' selected={numSlices === '1'}>
                  1 slice
                </option>
              )}

              {pathOptions[2].length >= 1 && (
                <option value='2' selected={numSlices === '2'}>
                  2 slices
                </option>
              )}

              {pathOptions[3].length >= 1 && (
                <option value='3' selected={numSlices === '3'}>
                  3 slices
                </option>
              )}

              {pathOptions[4].length >= 1 && (
                <option value='4' selected={numSlices === '4'}>
                  4 slices
                </option>
              )}
            </select>
          </div>
          <a target='_blank' rel='noreferrer' href={googleLink}>
            <button onClick={() => {}}>Open Route In Google Maps</button>
          </a>
        </>
      )}
    </>
  );
};

export default Search;
