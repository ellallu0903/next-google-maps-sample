import Image from 'next/image';

export default function Home() {
  return (
    <div className='h-[100%] flex flex-col items-center justify-center'>
      <Image width={300} height={300} src='/google_maps_icon.png' alt='Google Maps Icon' />
      <div className='text-3xl mt-8'>Google Maps API Sample</div>
    </div>
  );
}
