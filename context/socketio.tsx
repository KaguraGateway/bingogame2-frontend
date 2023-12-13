'use client';

import { createContext, useEffect, useMemo } from "react";
//@ts-ignore
import io from 'socket.io-client';

type Socket = {
    on: (event: string, callback: (data: any) => void) => void;
    off: (event: string, callback: (data: any) => void) => void;
    emit: (event: string, data: any) => void;
}
type SocketIOContext = {
    client: Socket;
}

export const SocketIOContext = createContext<SocketIOContext>(null!);

export function SocketIOProvier({ children, roomId }: { children: React.ReactNode, roomId: string }) {
    const url = process.env.NEXT_PUBLIC_SOCKETIO_SERVER; console.log(url);
    const client = useMemo(() => io(`${url}?room_id=${roomId}`, { withCredentials: true }), [roomId, url]);
    const contextValue = useMemo(() => ({ client }), [client]);
    useEffect(() => {
        const handleConnect = () => {
            console.log('connect');
        }
        const handleDisconnect = () => {
            console.log('disconnect');
        }
        client.on('connect', handleConnect);
        client.on('disconnect', handleDisconnect);
        client.on('error', console.error)
        return () => {
            client.off('connect', handleConnect);
            client.off('disconnect', handleDisconnect);
            client.off('error', console.error)
        }
    }, [client]);
    return (
        <SocketIOContext.Provider value={contextValue}>
            {children}
        </SocketIOContext.Provider>
    )
}
