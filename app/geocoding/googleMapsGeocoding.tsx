'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import Maps from './maps';

export default function GoogleMapsMarker() {
  const [ address, setAddress ] = useState<string>(''); 

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className='p-4'>
      <Input
        type="text"
        placeholder="請輸入地址"
        onChange={handleAddress}
      />
      <Maps />
    </div>
  )
}
