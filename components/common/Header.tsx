import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="p-4 bg-rose-400	text-center">
      <Link href="/">
        <Button variant="outline" className="mr-2">
          標記
        </Button>
      </Link>
      <Link href="/typeAddress">
        <Button variant="secondary">輸入</Button>
      </Link>
    </div>
  );
}
