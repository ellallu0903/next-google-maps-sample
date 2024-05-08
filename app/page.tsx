import Image from 'next/image';
import googleMapsIcon from '../public/google_maps_icon.png'

export default function Home() {
  return (
    <div className='h-[100%] flex flex-col items-center justify-center'>
      <Image className='h-[300px] w-auto' src={googleMapsIcon} alt='Google Maps Icon' />
      <div className='text-3xl mt-8'>Google Maps API Sample</div>
    </div>
  );
}
