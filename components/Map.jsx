import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
// import 'leaflet/dist/leaflet'
// import 'leaflet-defaulticon-compatibility'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility'
import Routing from './Routing';


// originally we used position: "absolute", transform: "translate(-50%)" with the style on line 15, but that wasn't necessary for the search

const Map = (props) => {
  return (
    <MapContainer center={props.startCoords} zoom={15} scrollWheelZoom={false} style={{height: "50vh", width: "50vh" }}>
       <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
      {/* <Marker
      position={[40.8054,-74.0241]}
      draggable={true}
      animate={true}
      >
        <Popup>
          Hey ! you found me
        </Popup>
      </Marker> */}
      <Routing startCoords={props.startCoords} pizzaData={props.pizzaData} pathNum={props.pathNum} numSlices={props.numSlices}></Routing>
    </MapContainer>
  )
}

export default Map



// const Map = () => {
//   return (
//     <MapContainer center={[40.8054,-74.0241]} zoom={14} scrollWheelZoom={false} style={{height: "50vh", width: "50vh" }}>
//        <TileLayer
//   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   />
//       <Marker
//       position={[40.8054,-74.0241]}
//       draggable={true}
//       animate={true}
//       >
//         <Popup>
//           Hey ! you found me
//         </Popup>
//       </Marker>
//     </MapContainer>
//   )
// }

// export default Map
