import PizzaPath from './PizzaPath';
import { findPaths } from '../utils/findPaths';
import { distance, deg2rad } from '../utils/distance';
import axios from 'axios';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import UserMap from './UserMap';
import ListItem from './ListItem';

import { BiWalk } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';

import {
  BsFillCheckSquareFill,
  BsFillXSquareFill,
  BsFillQuestionSquareFill,
} from 'react-icons/bs';

import spinner from '../public/assets/spinner.svg';
import Image from 'next/image';

import { toast } from 'react-toastify';

const Search = () => {
  // for map loading
  const [pathOptions, setOptions] = useState('');
  const [pathNumber, setPathNumber] = useState(0);

  // first screen state
  const [pathType, setPathType] = useState('');

  // second screen state
  const [locationType, setLocationType] = useState('');
  const [locationFound, setLocationFound] = useState(false);
  const [gpsCoords, setGpsCoords] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [userCoords, setUserCoords] = useState('');
  const [address, setAddress] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);

  const [localStatus, setLocalStatus] = useState('');

  //final screen state
  const [numSlices, setNumSlices] = useState('');
  const [pathDistance, setPathDistance] = useState('');
  const [searchSort, setSearchSort] = useState('');
  const [pathsLoading, setPathsLoading] = useState(false);

  // state for google link
  const [googleLink, setGoogleLink] = useState('');

  // state for list
  const [showList, setShowList] = useState(false);

  // ref for list
  const listRef = useRef(null);

  // for keeping track of current view

  let listHidden = true;

  //makes it so found GPS coords stay and only accessed once
  const toggleClass = () => {
    setLocationFound(true);
  };

  const generateNewPath = (sliceValue) => {
    if (pathOptions[Number(sliceValue)].length >= 1) {
      let newNum =
        Math.ceil(Math.random() * pathOptions[Number(sliceValue)].length) - 1;
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
        setGoogleLink(otherLink);
      }
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
    setLocalStatus('loading');

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
      const { latitude, longitude } = position.coords;

      {
        toggleClass();
      }
      setLocalStatus('found');
      setTimeout(() => {
        setUserCoords([latitude, longitude]);
      }, 500);
    }
    function onError() {
      return toast.error(
        'Location services for your browser must be turned on and allowed in order to use this feature.'
      );
    }
  };

  const [latitude, longitude] = userCoords;

  const searchPaths = async () => {
    // show loading spinner while making the API call
    setPathsLoading(true);

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
      if (paths.businesses.length === 0) {
        return toast.error(
          'Sorry, no pizza places found within that distance. Please extend your search radius or try another location.'
        );
      }
      let possiblePaths = findPaths(paths, pathDistance, userCoords);
      let otherLink = `https://www.google.com/maps/dir/${latitude},+${longitude}`;

      if (possiblePaths[numSlices].length !== 0) {
        for (let i = 0; i < numSlices; i++) {
          otherLink = otherLink.concat(
            `/${possiblePaths[numSlices][0][i].name
              .replace(/ /g, '+')
              .replace(/\//g, '%2F')},${possiblePaths[numSlices][0][
              i
            ].location.address1
              .replace(/ /g, '+')
              .replace(/\//g, '%2F')}`
          );
          setGoogleLink(otherLink);
        }
      } else {
        otherLink = otherLink.concat(
          `/${possiblePaths[1][0][0].name
            .replace(/ /g, '+')
            .replace(/\//g, '%2F')},${possiblePaths[1][0][0].location.address1
            .replace(/ /g, '+')
            .replace(/\//g, '%2F')}`
        );
        setGoogleLink(otherLink);
        toast.error(
          'Number of slices desired not possible. Here are some alternatives.'
        );
      }
      setPathsLoading(false);
      setOptions(possiblePaths);
    } else {
      window.alert(
        'In order to search you must share your location or enter an address, select how many slices you desire, and select your total path maximum distance.'
      );
    }
  };

  const getAddressCoords = async () => {
    if (address.length <= 5) {
      return toast.error('Please enter a real address');
    }
    setAddressLoading(true);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${address}&format=json&limit=1`
    );

    const data = await response.json();

    if (data[0]) {
      let foundLatitude = data[0].lat;
      let foundLongitude = data[0].lon;
      setUserCoords([foundLatitude, foundLongitude]);
      setAddressLoading(false);
    } else {
      return toast.error(
        'Sorry, that location did not return any results. For best results include your area code in the search bar.'
      );
    }
  };

  return (
    <>
      {!pathOptions && (
        <div className='w-full flex flex-col items-center font-boogaloo'>
          <div className='flex w-full max-w-[800px] bg-containerColor rounded-md border border-[#eaeaea] mt-2 min-h-[50vh] relative '>
            {!pathType && (
              <div className='flex flex-row items-center justify-around w-full text-lg thin:text-2xl sm:text-3xl md:text-4xl'>
                <div className='flex flex-col items-center '>
                  <BiWalk className='min-w-[150px] min-h-[200px] sm:min-w-[220px] sm:min-h-[220px]' />
                  <button
                    className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
                    onClick={() => setPathType('walking')}
                  >
                    I&apos;m walking
                  </button>
                </div>
                <div className='flex flex-col items-center'>
                  <AiFillCar className='min-w-[150px] min-h-[200px] sm:min-w-[220px] sm:min-h-[220px]' />
                  <button
                    className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
                    onClick={() => setPathType('driving')}
                  >
                    I&apos;m driving
                  </button>
                </div>
              </div>
            )}

            {pathType && !userCoords && (
              <div className='flex flex-row items-center justify-around w-full text-lg thin:text-2xl sm:text-3xl md:text-4xl relative'>
                <div className='flex flex-col items-center '>
                  {localStatus === 'found' && (
                    <BsFillCheckSquareFill className='min-w-[50px] min-h-[50px] text-green-700' />
                  )}
                  {localStatus === '' && (
                    <BsFillQuestionSquareFill className='min-w-[50px] min-h-[50px]' />
                  )}
                  {localStatus === 'loading' && (
                    <Image
                      src={spinner}
                      alt='Loading Image'
                      className='rounded-md animate-spin'
                      width={50}
                      height={50}
                    ></Image>
                  )}
                  <button
                    className='p-1 mt-2 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg
                    transform active:scale-y-75 transition-transform flex'
                    onClick={() => selectUserGps()}
                  >
                    From my location
                  </button>
                </div>

                <div className='flex flex-col items-center'>
                  <input
                    className='rounded-md p-2 min-h-[50px] pr-4 '
                    placeholder='Address & area code'
                    onChange={updateAddress}
                  />
                  <button
                    className='p-1 mt-2 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
                    onClick={() => getAddressCoords()}
                  >
                    From this location
                  </button>
                </div>
                {locationType !== '' && (
                  <div className='flex justify-center mb-4 ease-in duration-1000 absolute right-1 bottom-1'>
                    {locationType === 'gps' && gpsCoords === '' && (
                      <div>.... Loading</div>
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
                    className='underline cursor-pointer'
                    onClick={() => {
                      setUserCoords('');
                      setLocalStatus('');
                      setPathType('');
                    }}
                  >
                    Go Back
                  </span>
                </div>
              </div>
            )}

            {pathType && userCoords && (
              <div className='flex flex-row items-center justify-around w-full text-2xl md:text-3xl lg:text-4xl'>
                <div className='grid grid-rows-4 h-full'>
                  {/* {!numSlices && ( */}
                  <div className='flex flex-col items-center justify-center row-span-1'>
                    {/* I want: */}
                    <select
                      className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                      name='slices'
                      id='slices'
                      onChange={(e) => {
                        setNumSlices(e.target.value);
                      }}
                    >
                      <option defaultValue='' disabled selected>
                        {/* Slices */}I Want
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
                      {/* Within: */}
                      {pathType === 'walking' && (
                        <select
                          className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                          name='pathDistance'
                          id='pathDistance'
                          onChange={(e) => {
                            setPathDistance(e.target.value);
                          }}
                        >
                          <option defaultValue='' disabled selected>
                            {/* Path Distance */}
                            Within
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
                          className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                          name='pathDistance'
                          id='pathDistance'
                          onChange={(e) => {
                            setPathDistance(e.target.value);
                          }}
                        >
                          <option defaultValue='' disabled selected>
                            {/* Path Distance */}
                            Within
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
                      {/* Sorted by: */}
                      <select
                        className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                        name='searchType'
                        id='searchType'
                        onChange={(e) => {
                          setSearchSort(e.target.value);
                        }}
                      >
                        <option defaultValue='' disabled selected>
                          Sorted By
                        </option>
                        <option value='default'>Magic</option>
                        <option value='closest'>Closest</option>
                        <option value='rating'>Highest Rated</option>
                        <option value='reviews'>Most Reviewed</option>
                      </select>
                    </div>
                  )}
                  {numSlices &&
                    pathDistance &&
                    searchSort &&
                    pathsLoading === false && (
                      <div className='flex items-center justify-center row-span-1'>
                        <button
                          className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
                          onClick={() => searchPaths()}
                        >
                          Find My Path
                        </button>
                      </div>
                    )}
                  {pathsLoading && (
                    <div className='flex flex-col items-center justify-center row-span-1'>
                      <Image
                        src={spinner}
                        alt='Loading Image'
                        className='min-w-[100px] min-h-[100px] rounded-md animate-spin'
                      ></Image>
                    </div>
                  )}
                </div>
                <div className='absolute left-1 bottom-1 cursor-pointer'>
                  <span
                    className='underline'
                    onClick={() => {
                      setUserCoords('');
                      setLocalStatus('');
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
            {/* {pathsLoading === true && (
              <div className='flex flex-row items-center justify-around w-full text-2xl md:text-3xl lg:text-4xl'>
                <div className='flex flex-col items-center justify-center'>
                  <Image
                    src={spinner}
                    alt='Loading Image'
                    className='min-w-[100px] min-h-[100px] rounded-md animate-spin'
                  ></Image>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}

      {pathOptions && (
        <>
          <div className='border-black border-[4px] rounded-t-md relative'>
            <UserMap
              startCoords={userCoords}
              pizzaData={pathOptions}
              numSlices={slices.value}
              pathNum={pathNumber}
            />
            {showList && (
              <div className='w-full h-[50vh] absolute top-0 left-0 z-[1000] bg-slate-200 font-boogaloo flex flex-col items-center justify-center'>
                <div className='h-[96%] w-[96%] items-center justify-center flex flex-col'>
                  {pathOptions[slices.value][pathNumber].map((el, idx) => {
                    return (
                      <ListItem key={idx} pizzaData={el} stopNumber={idx} />
                    );
                  })}
                </div>
              </div>
            )}
            {/* <div
              ref={listRef}
              className='w-full h-[50vh] absolute top-0 left-0 bg-slate-200 font-boogaloo flex flex-col items-center justify-center'
            >
              <div className='h-[96%] w-[96%] items-center justify-center flex flex-col'>
                {pathOptions[slices.value][pathNumber].map((el, idx) => {
                  return <ListItem key={idx} pizzaData={el} stopNumber={idx} />;
                })}
              </div>
            </div> */}
          </div>
          <div className='flex flex-grow flex-col relative font-boogaloo'>
            <div className='flex flex-col items-center text-lg bg-slate-200 border-black border-x-4 border-b-4 rounded-b-md font-boogaloo relative'>
              <div className='flex flex-row'>
                <button
                  className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex mt-2 mr-2'
                  onClick={() => {
                    setPathNumber(generateNewPath(slices.value));
                  }}
                >
                  Give me another path!
                </button>
                <select
                  className='p-1 mt-2 rounded-md shadow-lg shadow-black outline outline-2 -outline-offset-2 outline-black'
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
                <button className='mt-4 p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex mb-4'>
                  Open Route In Google Maps
                </button>
              </a>
              <div className='flex flex-grow justify-center items-center cursor-pointer'>
                {/* <button className='p-1 rounded-md bg-[#4f646f] shadow-lg shadow-black align-bottom '>
                  Start over
                </button> */}
                <span
                  className='underline'
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Start Over
                </span>
              </div>
              <span
                className='absolute right-2 bottom-0 cursor-pointer'
                onClick={() => setShowList(!showList)}
                // onClick={() => {
                //   console.log('BOOP');
                //   const listNode = listRef.current;

                //   if (listHidden === true) {
                //     listNode.classList.add('z-[1000]');
                //     listHidden = false;
                //   }
                //   if (listHidden === false) {
                //     listNode.classList.remove('z-[1000');
                //     listHidden = true;
                //   }
                // }}
              >
                {/* Show {listHidden === true ? 'List' : 'Map'} */}
                Show {showList === false ? 'List' : 'Map'}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
