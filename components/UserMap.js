import React from 'react';
import dynamic from 'next/dynamic';

const UserMap = (props) => {
  const MapWithNoSSR = dynamic(() => import('../components/Map.jsx'), {
    ssr: false,
  });

  return (
    <div id='map'>
      <MapWithNoSSR
        startCoords={props.startCoords}
        pizzaData={props.pizzaData}
        pathNum={props.pathNum}
        numSlices={props.numSlices}
      />
    </div>
  );
};

export default UserMap;

// const UserMap = () => {
//   const MapWithNoSSR = dynamic(() => import('../components/Map.jsx'), {
//     ssr: false,
//   });

//   return (
//     <div id='map'>
//       <MapWithNoSSR />
//     </div>
//   );
// };

// export default UserMap;
