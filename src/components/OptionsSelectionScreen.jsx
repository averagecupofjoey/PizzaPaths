import React from 'react';

const OptionsSelectionScreen = ({
  handleSettingSliceCount,
  numSlices,
  pathDistance,
  pathsLoading,
  transportationMode,
  handleSettingPathDistance,
  searchSort,
  handleSettingSearchSort,
  resetGpsCoords,
  backToLocationScreen,
}) => {
  return (
    <div className='flex flex-row items-center justify-around w-full text-2xl md:text-3xl lg:text-4xl'>
      <div className='grid grid-rows-4 h-full'>
        {/* {!numSlices && ( */}
        <div className='flex flex-col items-center justify-center row-span-1'>
          {/* I want: */}
          <select
            className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
            name='slices'
            id='slices'
            onChange={handleSettingSliceCount}
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
            {transportationMode === 'walking' && (
              <select
                className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                name='pathDistance'
                id='pathDistance'
                onChange={handleSettingPathDistance}
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
            {transportationMode === 'driving' && (
              <select
                className='rounded-md text-center p-2 bg-slate-400 shadow-lg shadow-black min-w-full'
                name='pathDistance'
                id='pathDistance'
                onChange={handleSettingPathDistance}
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
              onChange={handleSettingSearchSort}
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
        {numSlices && pathDistance && searchSort && pathsLoading === false && (
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
            backToLocationScreen();
            // resetGpsCoords();

            // setLocalStatus('');
            // setLocationType('');
            // setNumSlices('');
            // setPathDistance('');
            // setSearchSort('');
            // setAddress('');
          }}
        >
          Go Back
        </span>
      </div>
    </div>
  );
};

export default OptionsSelectionScreen;
