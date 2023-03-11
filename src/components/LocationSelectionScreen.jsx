import {
  BsFillCheckSquareFill,
  BsFillQuestionSquareFill,
} from 'react-icons/bs';

import spinner from '../../public/assets/spinner.svg';

import Image from 'next/image';

const LocationSelectionScreen = ({
  selectUserGps,
  locationStatus,
  updateAddress,
  // resetGpsCoords,
  resetLocationStatus,
  resetTransportationMode,
  getAddressCoords,
}) => {
  return (
    <div className='flex flex-row items-center justify-around w-full text-lg thin:text-2xl sm:text-3xl md:text-4xl relative'>
      <div className='flex flex-col items-center '>
        {locationStatus === 'found' && (
          <BsFillCheckSquareFill className='min-w-[50px] min-h-[50px] text-green-700' />
        )}
        {locationStatus === null && (
          <BsFillQuestionSquareFill className='min-w-[50px] min-h-[50px]' />
        )}
        {locationStatus === 'loading' && (
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
      {/* {locationType !== '' && (
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
      )} */}
      <div className='absolute left-1 bottom-1'>
        <span
          className='underline cursor-pointer'
          onClick={() => {
            // resetGpsCoords();
            resetLocationStatus();
            resetTransportationMode();
          }}
        >
          Go Back
        </span>
      </div>
    </div>
  );
};

export default LocationSelectionScreen;
