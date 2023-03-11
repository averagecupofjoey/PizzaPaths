import React from 'react';

import { useCallback, useEffect, useState } from 'react';

import MainComponent from './MainComponent';

const MainContainer = () => {
  // transportation screen
  const [transportationMode, setTransportationMode] = useState(null);
  const [numberOfslices, setNumberOfSlices] = useState(null);

  // location screen
  const [gpsCoords, setGpsCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [address, setAddress] = useState('');

  // options screen
  const [numSlices, setNumSlices] = useState(null);
  const [pathDistance, setPathDistance] = useState(null);
  const [pathsLoading, setPathsLoading] = useState(false);
  const [searchSort, setSearchSort] = useState(null);

  const [yelpResults, setYelpResults] = useState(null);
  const [rating, setRating] = useState(null);

  // for map loading
  const [pathOptions, setOptions] = useState('');
  const [pathNumber, setPathNumber] = useState(0);

  useEffect(() => {
    if (transportationMode != null && numberOfslices != null) {
      fetch('')
        .then((r) => r.json())
        .then((data) => setYelpResults(data));
    }
  }, [transportationMode, numberOfslices]);

  useEffect(() => {
    if (yelpResults && rating) {
      // data processin
    }
  });

  // ***TRANSPORTATION SCREEN LOGIC***

  const setTransportationModeToWalking = useCallback(() => {
    setTransportationMode('walking');
  }, [setTransportationMode]);

  const setTransportationModeToDriving = useCallback(() => {
    setTransportationMode('driving');
  }, [setTransportationMode]);
  // -----------------------

  // ***LOCATION SCREEN LOGIC***

  // gets userGPS coords, sets loading spinner, alerts if geolocation is off
  const selectUserGps = () => {
    setLocationStatus('loading');

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
      const { latitude, longitude } = position.coords;

      // {
      //   toggleClass();
      // }
      setLocationStatus('found');
      setTimeout(() => {
        setGpsCoords([latitude, longitude]);
      }, 500);
    }
    function onError() {
      return toast.error(
        'Location services for your browser must be turned on and allowed in order to use this feature.'
      );
    }
  };

  // update address to find
  const updateAddress = (e) => {
    e.preventDefault;
    setAddress(e.target.value);
  };

  // query nominatim to get GPS coords
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
      setGpsCoords([foundLatitude, foundLongitude]);
      setAddressLoading(false);
    } else {
      return toast.error(
        'Sorry, that location did not return any results. For best results include your area code in the search bar.'
      );
    }
  };

  // reset state to go back

  const resetLocationStatus = useCallback(() => {
    setLocationStatus(null);
  }, [setLocationStatus]);

  const resetTransportationMode = useCallback(() => {
    setTransportationMode(null);
  }, [setTransportationMode]);

  // ---------------------

  // ***OPTIONS SELECTION SCREEN***

  const handleSettingSliceCount = useCallback(
    (e) => {
      setNumSlices(e.target.value);
    },
    [setNumSlices]
  );

  const handleSettingPathDistance = useCallback(
    (e) => {
      setPathDistance(e.target.value);
    },
    [setPathDistance]
  );

  const handleSettingSearchSort = useCallback(
    (e) => {
      setSearchSort(e.target.value);
    },
    [setSearchSort]
  );

  // reset state to go back
  const resetGpsCoords = useCallback(() => {
    setGpsCoords(null);
  }, [setGpsCoords]);

  const backToLocationScreen = useCallback(() => {
    setGpsCoords(null);
    setNumSlices(null);
    setPathDistance(null);
    setAddress('');
    setSearchSort(null);
    setLocationStatus(null);
  }, [
    setGpsCoords,
    setNumSlices,
    setPathDistance,
    setAddress,
    setSearchSort,
    setLocationStatus,
  ]);

  return (
    <MainComponent
      transportationMode={transportationMode}
      setTransportationModeToWalking={setTransportationModeToWalking}
      setTransportationModeToDriving={setTransportationModeToDriving}
      pathOptions={pathOptions}
      locationStatus={locationStatus}
      // setLocationStatus={setLocationStatus}
      selectUserGps={selectUserGps}
      gpsCoords={gpsCoords}
      // setGpsCoords={setGpsCoords}
      getAddressCoords={getAddressCoords}
      updateAddress={updateAddress}
      addressLoading={addressLoading}
      // setAddressLoading={setAddressLoading}
      resetGpsCoords={resetGpsCoords}
      resetLocationStatus={resetLocationStatus}
      resetTransportationMode={resetTransportationMode}
      numSlices={numSlices}
      // setNumSlices={setNumSlices}
      handleSettingSliceCount={handleSettingSliceCount}
      pathDistance={pathDistance}
      pathsLoading={pathsLoading}
      handleSettingPathDistance={handleSettingPathDistance}
      handleSettingSearchSort={handleSettingSearchSort}
      searchSort={searchSort}
      backToLocationScreen={backToLocationScreen}
    />
  );
};

export default MainContainer;
