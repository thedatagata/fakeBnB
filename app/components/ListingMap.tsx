"use client";
import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {useState} from 'react'
import getCenter from 'geolib/es/getCenter'
import { FaMapMarkerAlt } from "react-icons/fa";

interface ListingMapProps {
  listings: any
};



const ListingMap: React.FC<ListingMapProps> = ({ listings }) => {
  const listingCoords = listings.map((listing: any) => ({
    latitude: listing.latitude,
    longitude: listing.longitude
  }));
  console.log(listingCoords);
  const mapCenter = getCenter(listingCoords); 
  console.log(mapCenter);
  const [viewState, setViewState] = useState({
    latitude: mapCenter.latitude,
    longitude: mapCenter.longitude,
    zoom: 10,
  })


  return (
    <ReactMapGL
     mapboxAccessToken={process.env.mapbox_key}
     style={{width: "100%", height: "100%"}}
     mapStyle={process.env.style_url}
     initialViewState={{
      ...viewState
     }}
     onMove={evt => setViewState(evt.viewState)}
    >
     {listings.map((listing: any)=>(
      <div key={listing.id}>
        <Marker
         key={listing.id}
         longitude={listing.longitude} 
         latitude={listing.latitude}
        >
          <p className="cursor-pointer text-2xl animate-bounce">
            <FaMapMarkerAlt />
          </p>
        </Marker>
      </div>
     ))}
    </ReactMapGL>

  )
}

export default ListingMap
