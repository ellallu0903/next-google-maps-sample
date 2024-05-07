'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LocationType, AddressType } from './type/locationTypes';

type MapProps = {
  location: LocationType;
  locationsData: AddressType[];
}

export default function Maps({ location, locationsData }: MapProps) {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async() => {
      if (!location) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly'
      })

      // Init a map
      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary;
      // Init a marker
      const { Marker } = await loader.importLibrary('marker');
      // Init a infoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      }) as google.maps.InfoWindow;

      const locationInMap = {
        lat: location.lat,
        lng: location.lng
      }
      
      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAP'
      }

      // Setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      // Put up a markers
      const markers = locationsData.map((item: AddressType) => {
        const marker = new google.maps.Marker({
          position: {
            lat: item.lat,
            lng: item.lng
          }
        });
    
        marker.addListener("click", () => {
          infoWindow.setContent(
            `
            <div>${item.name}</div>
            <div>${item.address}</div>
            `
          );
          infoWindow.open(map, marker);
        });
    
        return marker;
      });

      new MarkerClusterer({ markers, map });
    }

    initMap();
  }, [ location, locationsData ]);

  return (
    <div className='h-[100%] w-[75%]' ref={mapRef} />
  )
}
