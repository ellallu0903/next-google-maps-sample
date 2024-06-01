import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <footer className="py-4 sm:px-6 px-2 bg-red-700	text-center flex items-center justify-between">
      <Link href="/">
        <Image
          width={24}
          height={24}
          src="/google_maps_icon.png"
          alt="Google Maps Icon"
        />
      </Link>
      <div className="space-x-1">
        <Link href="/autoComplete">
          <Button variant="outline" className="p-1">
            AutoComplete
          </Button>
        </Link>
        <Link href="/markerclusterer">
          <Button variant="outline" className="p-1">
            標記叢集
          </Button>
        </Link>
        <Link href="/hoverMarker">
          <Button variant="outline" className="p-1">
            Hover
          </Button>
        </Link>
        <Link href="/geocoding">
          <Button variant="outline" className="p-1">
            地理編碼
          </Button>
        </Link>
      </div>
    </footer>
  );
}
