'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import Maps from './maps';

export default function GoogleMapsMarker() {
  const [ address, setAddress ] = useState<string>(''); 

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className='p-4 h-full flex flex-col'>
      <Input
        type="text"
        className='mb-4'
        placeholder="請輸入地址"
        onChange={handleAddress}
      />
      <Maps address={address} />
    </div>
  )
}
