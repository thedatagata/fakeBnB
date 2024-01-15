'use client'
import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { FaMapMarkerAlt } from "react-icons/fa";
import { WebMercatorViewport } from '@math.gl/web-mercator';

interface Listing {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}

interface ListingMapProps {
  listings: Listing[];
};

const ListingMap: React.FC<ListingMapProps> = ({ listings }) => {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listings.length === 0 || !mapContainerRef.current) {
      return;
    }

    const coordinates = listings.map(listing => ({
      latitude: listing.latitude,
      longitude: listing.longitude
    }));

    const mapCenter = getCenter(coordinates);
    const boundsRect = mapContainerRef.current.getBoundingClientRect();

    let bounds = [
      [Infinity, Infinity],
      [-Infinity, -Infinity]
    ] as [[number, number], [number, number]]; 

    coordinates.forEach(coord => {
      bounds = [
        [Math.min(bounds[0][0], coord.longitude), Math.min(bounds[0][1], coord.latitude)],
        [Math.max(bounds[1][0], coord.longitude), Math.max(bounds[1][1], coord.latitude)]
      ];
    });
    const viewport = new WebMercatorViewport({ width: boundsRect.width, height: boundsRect.height })
      .fitBounds(
        bounds=[bounds[0], bounds[1]],
        { 
          maxZoom: 15,
          padding: 20
        }
      );

    if(mapCenter){
      setViewState({
        latitude: mapCenter.latitude, 
        longitude: mapCenter.longitude,
        zoom: viewport.zoom
      });
    }
  }, [listings]);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      <Map
        mapboxAccessToken={process.env.mapbox_key}
        mapStyle={process.env.style_url}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
      >
        <div className="markers-container">
          {listings.map((listing) => (
              <Marker key={listing.id} longitude={listing.longitude} latitude={listing.latitude}>
                <p className="cursor-pointer text-2xl animate-bounce">
                  <FaMapMarkerAlt />
                </p>
              </Marker>
            ))}
        </div>
      </Map>
    </div>
  );
};

export default ListingMap;


