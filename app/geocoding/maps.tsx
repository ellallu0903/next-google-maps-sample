'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { LocationType } from '../../components/type/locationTypes'

type MapProps = {
  address: string;
};

export default function Map({ address } : MapProps) {
  const [ location, setLocation ] = useState<LocationType>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user's location
    const successHandler = ({ coords }: GeolocationPosition): void => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const errorHandler = (error: GeolocationPositionError): void => {
      alert(error.message);
      setLocation({ lat: 23.5, lng: 121 });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    }
  }, []);

  useEffect(() => {
    const initMap = async() => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly'
      })

      // Init a map
      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary;
      // Init a marker
      const { Marker } = await loader.importLibrary('marker');
      // Init a geocoder
      const { Geocoder } = await loader.importLibrary('geocoding');

      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: location,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAP_GEOCODING'
      };

      // Setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      const geocoder = new Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results) {
          map.setCenter(results[0].geometry.location);
            new Marker({
              map: map,
              position: results[0].geometry.location,
            });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    };

    initMap();
  }, [ address, location ]);
  

  return (
    <div className='h-[100%] w-[100%] flex-grow' ref={mapRef} />
  )
}
