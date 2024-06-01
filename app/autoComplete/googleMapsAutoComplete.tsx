"use client";

import React, { useEffect, useState, useRef } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui/input";
import { useJsApiLoader } from "@react-google-maps/api";
import { LocationType } from "../../components/type/locationTypes";

const libs: Library[] = ["core", "maps", "places", "marker"];
const mapInfoCardContent = (title: string, body: string) => {
  return `
    <div>
      <div className='text-2xl'>${title}</div>
      <div>${body}</div>
    </div>
  `;
};

export default function GoogleMapsAutoComplete() {
  const [location, setLocation] = useState<LocationType>();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
    language: "zh-TW",
  });

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
    if (isLoaded) {
      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: location,
        zoom: 17,
        mapId: "MY_NEXTJS_AUTOCOMPLETE_MAP",
      };

      // Setup the map
      const googleMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );
      // Setup autocomplete
      const googleAutoComplete = new google.maps.places.Autocomplete(
        autocompleteRef.current as HTMLInputElement,
        {
          types: ["address"],
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["tw"],
          },
        }
      );

      setMap(googleMap);
      setAutoComplete(googleAutoComplete);
    }
  }, [isLoaded, location]);

  useEffect(() => {
    const setMarker = (
      location: google.maps.LatLng,
      name: string,
      place: string
    ) => {
      if (!map) return;

      map.setCenter(location);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location,
        title: "name",
      });

      const infoCard = new google.maps.InfoWindow({
        position: location,
        content: mapInfoCardContent(name, place),
        maxWidth: 200,
      });

      infoCard.open({
        map: map,
        anchor: marker,
      });
    };

    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        const position = place.geometry?.location;

        if (position) {
          // Place a marker
          setMarker(position, place.name!, place.formatted_address!);
        }
      });
    }
  }, [autoComplete, map]);

  return (
    <div className="p-4 h-full flex flex-col">
      <Input
        type="text"
        className="mb-4"
        placeholder="請輸入地址"
        ref={autocompleteRef}
      />
      {isLoaded ? (
        <div className="h-[100%] w-[100%] flex-grow" ref={mapRef}></div>
      ) : (
        <div className="h-[100%] w-[100%] flex-grow flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}
