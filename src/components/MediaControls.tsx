export function MediaControls({pauseOrPlay, playNext, playPrevious}:{
    pauseOrPlay: () => void,
    playNext: () => void,
    playPrevious: () => void
}){
    return <div className="flex flex-row gap-2 justify-center">
        <button onClick={playPrevious} className="bg-gray-200 border border-gray-500 p-2 rounded-md hover:bg-gray-300">
          previous
        </button>
        <button onClick={pauseOrPlay} className="bg-gray-200 border border-gray-500 p-2 rounded-md hover:bg-gray-300">
          play/pause
        </button>
        <button onClick={playNext} className="bg-gray-200 border border-gray-500 p-2 rounded-md hover:bg-gray-300">
          next
        </button>
    </div>
}