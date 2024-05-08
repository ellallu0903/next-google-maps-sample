"use client";

import React, { useState, useEffect } from "react";
import locationsData from "../../components/data/locations.json";
import Maps from "./maps";
import { LocationType, AddressType } from "../../components/type/locationTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoogleMaps() {
  const [location, setLocation] = useState<LocationType>();

  useEffect(() => {
    // Get user's location
    const successHandler = ({ coords }: GeolocationPosition): void => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const errorHandler = (error: GeolocationPositionError): void => {
      alert(error.message);
      setLocation({ lat: locationsData[0].lat, lng: locationsData[0].lng });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    }
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex justify-between p-4">
      <Maps location={location!} locationsData={locationsData} />
      <div className="flex flex-col w-[25%] min-w-[200px] pl-4 overflow-auto">
        {locationsData.map((item: AddressType) => {
          return (
            <Card key={item.lat} className="w-[100%] mb-2">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{item.address}</p>
                <div>緯度：{item.lat}</div>
                <div>經度：{item.lng}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
