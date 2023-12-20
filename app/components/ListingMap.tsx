"use client";
import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {useState} from 'react'
import getCenter from 'geolib/es/getCenter'
import { FaMapMarkerAlt } from "react-icons/fa";


const ListingMap = ({ listings }) => {
  const listingCoords = listings.map((listing: any) => ({
    latitude: listing.latitude,
    longitude: listing.longitude
  }));
  const mapCenter = getCenter(listingCoords); 
  const [selectedListing, setSelectedListing] = useState({} as any)
  const [viewState, setViewState] = useState({
    latitude: mapCenter.latitude,
    longitude: mapCenter.longitude,
    zoom: 10,
  })


  return (
    <ReactMapGL
     mapboxAccessToken={process.env.mapbox_key}
     mapStyle={process.env.style_url}
     initialViewState={{
      ...viewState
     }}
     onMove={evt => setViewState(evt.viewState)}
    >
     {listings.map((listing)=>(
      <div>
        <Marker
         key={listing.id}
         longitude={listing.longitude} 
         latitude={listing.latitude} 
         offsetLeft={-20} 
         offsetTop={-10}
        >
          <p className="cursor-pointer text-2xl animate-bounce" onClick={()=>setSelectedListing(listing)}>
            <FaMapMarkerAlt />
          </p>
        </Marker>
      </div>
     ))}
    </ReactMapGL>

  )
}

export default ListingMap
