import { useState, useEffect, useCallback } from 'react';

export default function useSocket(url: string) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connect = useCallback(() => {
        let newSocket: WebSocket;

        try {
            newSocket = new WebSocket(url);
        } catch (e) {
            console.error('Failed to create WebSocket:', e);
            setError('Failed to create WebSocket connection');
            return () => {};
        }

        newSocket.onopen = () => {
            console.log('WebSocket connection established.');
            setIsConnected(true);
            setError(null);
        };

        newSocket.onclose = (event) => {
            console.error(`WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`);
            setIsConnected(false);
            setError(`Connection closed (${event.code})`);
            setTimeout(connect, 5000);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
            setError('WebSocket error occurred');
        };

        newSocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Handle incoming messages here
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
            setError('Cannot send message: WebSocket is not connected');
        }
    }, [socket]);

    return { isConnected, sendCommand, error } as const;
}