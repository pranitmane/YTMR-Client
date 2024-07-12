import { PlayIcon, PauseIcon, TrackNextIcon, TrackPreviousIcon, Half2Icon } from '@radix-ui/react-icons'

export function MediaControls({ pauseOrPlay, playNext, playPrevious, isPlaying }: {
  pauseOrPlay: () => void,
  playNext: () => void,
  playPrevious: () => void,
  isPlaying: "playing" | "paused" | "loading" | "nothing"
}) {
  const buttonClass = "bg-zinc-900/30 shadow-md p-5 rounded-full hover:bg-zinc-800/30";
  const iconClass = "text-zinc-300 h-5 w-5";

  return (
    <div className="flex flex-1 flex-row gap-2 justify-center items-center">
      <button onClick={playPrevious} className={buttonClass}>
        <TrackPreviousIcon className={iconClass} />
      </button>
      {isPlaying === "loading" ? (
        <button disabled className={`${buttonClass} p-8`}>
          <Half2Icon className={`${iconClass} animate-spin`} />
        </button>
      ) : (
        <button onClick={pauseOrPlay} className={`${buttonClass} p-8`}>
          {isPlaying === "playing" ? (
            <PauseIcon className={iconClass} />
          ) : (
            <PlayIcon className={iconClass} />
          )}
        </button>
      )}
      <button onClick={playNext} className={buttonClass}>
        <TrackNextIcon className={iconClass} />
      </button>
    </div>
  );
}


