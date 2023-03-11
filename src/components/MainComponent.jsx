import React from 'react';

import LocationSelectionScreen from './LocationSelectionScreen';
import TransportationModeSelectionScreen from './TransportationModeSelectionScreen';
import OptionsSelectionScreen from './OptionsSelectionScreen';

const MainComponent = ({
  transportationMode,
  setTransportationModeToWalking,
  setTransportationModeToDriving,
  numberOfslices,
  yelpResults,
  pathOptions,
  locationStatus,
  getAddressCoords,
  updateAddress,
  gpsCoords,
  // setGpsCoords,
  selectUserGps,
  // setLocationStatus,
  resetGpsCoords,
  resetLocationStatus,
  resetTransportationMode,
  addressLoading,
  numSlices,
  handleSettingSliceCount,
  pathDistance,
  pathsLoading,
  handleSettingPathDistance,
  handleSettingSearchSort,
  searchSort,
  backToLocationScreen,
  // setAddressLoading,
}) => {
  if (pathOptions === '') {
    return (
      <div className='w-full flex flex-col items-center font-boogaloo'>
        <div className='flex w-full max-w-[800px] bg-containerColor rounded-md border border-[#eaeaea] mt-2 min-h-[50vh] relative '>
          {!transportationMode && (
            <TransportationModeSelectionScreen
              setTransportationModeToWalking={setTransportationModeToWalking}
              setTransportationModeToDriving={setTransportationModeToDriving}
            />
          )}
          {transportationMode && !gpsCoords && (
            <LocationSelectionScreen
              selectUserGps={selectUserGps}
              locationStatus={locationStatus}
              // setLocationStatus={setLocationStatus}
              getAddressCoords={getAddressCoords}
              updateAddress={updateAddress}
              // resetGpsCoords={resetGpsCoords}
              resetLocationStatus={resetLocationStatus}
              resetTransportationMode={resetTransportationMode}
              addressLoading={addressLoading}
              // setAddressLoading={setAddressLoading}
            />
          )}
          {transportationMode && gpsCoords && (
            <OptionsSelectionScreen
              numSlices={numSlices}
              handleSettingSliceCount={handleSettingSliceCount}
              pathDistance={pathDistance}
              pathsLoading={pathsLoading}
              transportationMode={transportationMode}
              handleSettingPathDistance={handleSettingPathDistance}
              handleSettingSearchSort={handleSettingSearchSort}
              searchSort={searchSort}
              resetGpsCoords={resetGpsCoords}
              backToLocationScreen={backToLocationScreen}
            />
          )}
        </div>
      </div>
    );
  }

  if (!numberOfslices) {
    return <div>2</div>;
  }
};

export default MainComponent;
