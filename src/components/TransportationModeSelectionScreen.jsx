import { BiWalk } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';

const TransportationModeSelectionScreen = ({
  setTransportationModeToWalking,
  setTransportationModeToDriving,
}) => {
  return (
    <div className='flex flex-row items-center justify-around w-full text-lg thin:text-2xl sm:text-3xl md:text-4xl'>
      <div className='flex flex-col items-center '>
        <BiWalk className='min-w-[150px] min-h-[200px] sm:min-w-[220px] sm:min-h-[220px]' />
        <button
          className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
          onClick={() => setTransportationModeToWalking()}
        >
          I&apos;m walking
        </button>
      </div>
      <div className='flex flex-col items-center'>
        <AiFillCar className='min-w-[150px] min-h-[200px] sm:min-w-[220px] sm:min-h-[220px]' />
        <button
          className='p-1 rounded-md bg-slate-400 shadow-black focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex'
          onClick={() => setTransportationModeToDriving()}
        >
          I&apos;m driving
        </button>
      </div>
    </div>
  );
};

export default TransportationModeSelectionScreen;
