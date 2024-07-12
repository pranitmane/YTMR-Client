import React, { useState, useEffect, useRef } from 'react';
import { SpeakerLoudIcon, SpeakerModerateIcon, SpeakerOffIcon, SpeakerQuietIcon } from '@radix-ui/react-icons';

interface VolumeControllerOverlayProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
    onClose: () => void;
}

const getVolumeIcon = (volume:number): JSX.Element => {
    if (volume === 0) return <SpeakerOffIcon className="text-white" />;
    if (volume < 33) return <SpeakerQuietIcon className="text-white" />;
    if (volume < 67) return <SpeakerModerateIcon className="text-white" />;
    return <SpeakerLoudIcon className="text-white" />;
};

const VolumeControllerOverlay: React.FC<VolumeControllerOverlayProps> = ({ volume, onVolumeChange, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [volume, onClose]);


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
            <div ref={overlayRef} className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 w-64 shadow-lg">
                <div className="flex items-center mb-4">
                    {getVolumeIcon(volume)}
                    <div className="text-white font-semibold ml-2">{volume}%</div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    className="w-full appearance-none bg-white/30 h-1 rounded-full outline-none"
                />
            </div>
        </div>
    );
};

const VolumeController = ({ socket }: {
    socket: WebSocket | null
}) => {
    const [volume, setVolume] = useState<number>(10);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        let timeouts = [];
        let timeout = setTimeout(() => {
            socket?.send(JSON.stringify({
                type: 'sysCommand', data: {
                    command: 'setVolume',
                    volume: volume
                }
            }));
        }, 200);
        timeouts.push(timeout);
        if (timeouts.length > 1) {
            clearTimeout(timeouts[0]);
            timeouts.shift();
        }
        return () => clearTimeout(timeout);
    }, [volume])

    const handleVolumeChange = (newVolume: number): void => {
        setVolume(newVolume);
    };

    const handleButtonClick = (): void => {
        setIsVisible(true);
    };

    const handleClose = (): void => {
        setIsVisible(false);
    };

    return (
        <>
            <button
                onClick={handleButtonClick}
                className="p-5 rounded-full flex-1"
            >
                {getVolumeIcon(volume)}
            </button>
            {isVisible && (
                <VolumeControllerOverlay
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    onClose={handleClose}
                />
            )}
        </>
    );
};

export default VolumeController;