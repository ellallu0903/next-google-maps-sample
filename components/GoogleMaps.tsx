'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import locationsData from './data/locations.json';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type locationType = {
  lat: number;
  lng: number;
}

type addressType = {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function GoogleMaps() {
  const [ location, setLocation ] = useState<locationType>();
  const mapRef = useRef<HTMLDivElement>(null);

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
      // Init a infoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      }) as google.maps.InfoWindow;

      if(location && location.lat && location.lng) {
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
        const markers = locationsData.map((item) => {
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
    }

    initMap();
  }, [ location ]);

  useEffect(() => {
    // Get user's location
    const successHandler = ({ coords } : GeolocationPosition): void => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const errorHandler = (error: GeolocationPositionError): void => {
      alert(error.message);
      setLocation({ lat: locationsData[0].lat, lng: locationsData[0].lng });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    };
  }, []);

  return (
    <div className='w-[100%] h-[100%] flex justify-between'>
      <div className='h-[100%] w-[75%]' ref={mapRef} />
      <div className='flex flex-col w-[25%] pl-4 overflow-auto'>
        {
          locationsData.map((item: addressType) => {
            return (
              <Card className='w-[100%] mb-2'>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='mb-2'>{item.address}</p>
                  <div>緯度：{item.lat}</div>
                  <div>經度：{item.lng}</div>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}
