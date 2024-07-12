import { useEffect } from 'react';
import { MediaControls } from './components/MediaControls';
import useSocket from './hooks/useSocket';
import VolumeController from './components/VolumeControls';

export default function App() {
  const { isConnected, sendCommand, streamData, socket } = useSocket(`ws:${window.location.hostname}:8080`);

  useEffect(() => {

  }, [streamData])

  const onNextClick = () => sendCommand('playNext');
  const onPreviousClick = () => sendCommand('playPrevious');
  const onPlayPause = () => sendCommand('pauseOrPlay');

  return (
    <main className="w-screen h-screen p-5 relative text-white overflow-hidden">
      <div className="flex flex-col gap-4 items-center">
      <h1 className="te
      xt-md font-bold p-2 text-zinc-400 text-center">YTM Remote</h1>
        <span className={`bottom-0 fixed p-2 w-full text-center  ${isConnected === true ? 'bg-green-600 hidden' : 'bg-red-600'}`}>
          {isConnected === true ? 'connected' : 'disconnected'}
        </span>
        <div className='relative w-fit h-fit'>
          <img className='sm:w-96 w-full aspect-square rounded-lg' src={streamData.data.url} alt="something went wrong" />
          <img className='w-full h-full  aspect-square rounded-lg absolute top-0 scale-125 scale-y-150 z-[-10] blur-3xl brightness-50' src={streamData.data.url} alt="something went wrong" />
        </div>
        <h2 className="text-xl font-bold sm:w-96 w-full rounded-md p-2">
          <span className='block truncate'>
            {streamData.data.title}
          </span>
        </h2>
        <span className='flex flex-row gap-4 items-center'>
          <div className='flex-1 p-5'></div>
          <MediaControls
            isPlaying={streamData.data.isPlaying}
            pauseOrPlay={onPlayPause}
            playNext={onNextClick}
            playPrevious={onPreviousClick}
          />
          <VolumeController socket={socket} />
        </span>
      </div>
    </main>
  );
}