import { useEffect} from 'react';
import { MediaControls } from './components/MediaControls';
import useSocket from './hooks/useSocket';

export default function App() {
  const { isConnected, sendCommand, error } = useSocket(`ws:${window.location.hostname}:8080`);

  useEffect(() => {
    if (error) {
        console.error('WebSocket error:', error);
    }
}, [error]);

  const onNextClick = () => sendCommand('playNext');
  const onPreviousClick = () => sendCommand('playPrevious');
  const onPlayPause = () => sendCommand('pauseOrPlay');

  return (
    <main className="w-screen h-screen p-5 relative">
      <div className="flex flex-col gap-4 items-center">
        <span className={`bottom-0 fixed p-2 w-full text-center ${isConnected === true ? 'bg-green-400' : 'bg-red-400'}`}>
          {isConnected}
        </span>
        <h1 className="text-2xl font-bold p-2">YTM Remote</h1>
        <p className="text-lg bg-yellow-200 border border-yellow-500 p-4 pl-6 pr-6 rounded-md">
          { 'title of the song'}
        </p>
        <p>{error}</p>
        <MediaControls
          pauseOrPlay={onPlayPause}
          playNext={onNextClick}
          playPrevious={onPreviousClick}
        />
      </div>
    </main>
  );
}