"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationType, AddressType } from "../../components/type/locationTypes";

type MapProps = {
  location: LocationType;
  locationsData: AddressType[];
  selectedEvent?: AddressType | null;
};

export default function Maps({
  location,
  locationsData,
  selectedEvent,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!location) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      // Init a map
      const { Map } = (await loader.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      // Init a marker
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const locationInMap = {
        lat: selectedEvent ? selectedEvent.lat : location.lat,
        lng: selectedEvent ? selectedEvent.lng : location.lng,
      };

      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 17,
        mapId: "MY_NEXTJS_MAP",
      };

      // Setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // Put up a markers
      const markers = locationsData.map((item: AddressType) => {
        const tag = document.createElement("div");
        tag.className = `
        h-8 p-2 rounded-full border flex items-center justify-center
        ${
          selectedEvent?.lat === item.lat && selectedEvent?.lng === item.lng
            ? "bg-red-700 text-neutral-300 text-slate-50"
            : "bg-neutral-50 border-red-700 text-red-700"
        }`;
        tag.textContent = `${item.name}`;

        const marker = new AdvancedMarkerElement({
          map,
          position: {
            lat: item.lat,
            lng: item.lng,
          },
          content: tag,
          title: item.name,
        });

        return marker;
      });
    };

    initMap();
  }, [location, locationsData, selectedEvent]);

  return <div className="h-[100%] w-[75%]" ref={mapRef} />;
}
