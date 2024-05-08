import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import googleMapsIcon from '../../public/google_Maps_icon.png'

export default function Header() {
  return (
    <footer className="py-4 px-6 bg-red-700	text-center flex items-center justify-between">
      <Link href='/'>
        <Image className='h-[24px] w-auto' src={googleMapsIcon} alt='Google Maps Icon' />
      </Link>
      <div>
        <Link href="/markerclusterer">
          <Button variant="outline" className="mr-2">
            標記叢集
          </Button>
        </Link>
        <Link href="/geocoding">
          <Button variant="secondary">地理編碼</Button>
        </Link>
      </div>
    </footer>
  );
}
