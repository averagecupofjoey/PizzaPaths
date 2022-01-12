import React from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('../components/Map.jsx'), {
    ssr: false,
  });

  return (
    <div id='map'>
      <MapWithNoSSR />
    </div>
  );
}

// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import './App.css';
// import { Icon } from 'leaflet';
// // import * as parkData from './data/skateboard-parks.json';

// function App() {
//   return (
//     <MapContainer
//       center={[45.4, -75.7]}
//       zoom={12}
//       scrollWheelZoom={false}
//       style={{ height: '100px', width: '100px' }}
//     >
//       <TileLayer
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//     </MapContainer>
//   );
// }
