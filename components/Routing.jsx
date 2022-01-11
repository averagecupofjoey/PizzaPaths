import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  const map = useMap();
  console.log("!!!!!!!!!!",props)
  console.log("????????", props.pizzaData[Number(props.numSlices)][props.pathNum])
  const selectedData = props.pizzaData[Number(props.numSlices)][props.pathNum]
  const numSlices = Number(props.numSlices)


  useEffect(() => {
    if (!map) return;
    // const waypoints = props.pizzaData[Number(props.numSlices)][props.pathNum].map(el =>{
    //   return `L.ltatLng(${el.latitude}, ${el.longitude}),`
    // })
    // console.log("***********", waypoints)
    const pizzaWaypoints = [];
    pizzaWaypoints.push(`${L.latLng(props.startCoords[0], props.startCoords[1])}`)
    for(let i=0; i< selectedData.length; i++){
      pizzaWaypoints.push(`${L.latLng(selectedData[i].coordinates.latitude, selectedData[i].coordinates.longitude)}`)
    }
    console.log("*&^&**((", pizzaWaypoints)

    let pizzaPoints = [];
    if(numSlices === 1 ){
      pizzaPoints = [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(selectedData[0].coordinates.latitude, selectedData[0].coordinates.longitude)]
    }
    if(numSlices === 2 ){
      pizzaPoints = [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(selectedData[0].coordinates.latitude, selectedData[0].coordinates.longitude), L.latLng(selectedData[1].coordinates.latitude, selectedData[1].coordinates.longitude)]
    }
    if(numSlices === 3 ){
      pizzaPoints = [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(selectedData[0].coordinates.latitude, selectedData[0].coordinates.longitude), L.latLng(selectedData[1].coordinates.latitude, selectedData[1].coordinates.longitude), L.latLng(selectedData[2].coordinates.latitude, selectedData[2].coordinates.longitude)]
    }
    if(numSlices === 4 ){
      pizzaPoints = [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(selectedData[0].coordinates.latitude, selectedData[0].coordinates.longitude), L.latLng(selectedData[1].coordinates.latitude, selectedData[1].coordinates.longitude), L.latLng(selectedData[2].coordinates.latitude, selectedData[2].coordinates.longitude), L.latLng(selectedData[3].coordinates.latitude, selectedData[3].coordinates.longitude)]
    }

    const options = { profile: "mapbox/walking"};
    const routingControl = L.Routing.control({


      // waypoints: [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(40.76626, -73.98726)],
      waypoints: pizzaPoints,
      routeWhileDragging: false,
      router: L.Routing.mapbox('pk.eyJ1IjoianJlbGlhcyIsImEiOiJja3k5YzQxMmEwNTIyMm9udjVnaGVsbW1rIn0.1o1FNaFb-nIiMV0xFGyyCg', options)
    }).addTo(map);

    // const routingControl = L.Routing.control({
    //   waypoints: [L.latLng(props.startCoords[0], props.startCoords[1]), L.latLng(40.76626, -73.98726)],
    //   // waypoints: [],
    //   routeWhileDragging: false
    // }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
