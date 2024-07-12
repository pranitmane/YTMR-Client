import { useState, useEffect, useCallback } from 'react';

export default function useSocket(url: string) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [streamData, setStreamData] = useState<responseStream>({
        type: "status",
        data: {
            title: "",
            url: "",
            isPlaying: "nothing"
        },
        message: ""
    });

    type responseStream = {
        type: "status",
        data: {
            title: string,
            url: string,
            isPlaying: "playing" | "paused" | "loading" | "nothing"
        },
        message: string
    };

    const connect = useCallback(() => {
        let newSocket: WebSocket;

        try {
            newSocket = new WebSocket(url);
        } catch (e) {
            console.error('Failed to create WebSocket:', e);
            return () => { };
        }

        newSocket.onopen = () => {
            console.log('WebSocket connection established.');
            setIsConnected(true);
        };

        newSocket.onclose = (event) => {
            console.error(`WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`);
            setIsConnected(false);
            setTimeout(connect, 5000);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        newSocket.onmessage = (event) => {
            try {
                console.log('WebSocket message received:', event.data);
                let jsonData = JSON.parse(event.data);
                if (jsonData.type === "status") {
                    if (jsonData.data.title === "YouTube Music") {
                        jsonData.data.title = "No media playing";
                    }
                    setStreamData(jsonData);
                } else if(jsonData.type ==="init"){
                    setStreamData(jsonData);
                }
            } catch (e) {
                console.error('Failed to parse message:', e);
            }
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [url]);

    useEffect(() => {
        const cleanup = connect();
        return cleanup;
    }, [connect]);

    const sendCommand = useCallback((command: 'pauseOrPlay' | 'playNext' | 'playPrevious') => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "command", data: { command: command }, message: "from client" }));
        } else {
            console.error('WebSocket is not connected.');
        }
    }, [socket]);

    return { isConnected, sendCommand, streamData,socket} as const;
}