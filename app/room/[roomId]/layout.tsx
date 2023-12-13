import { SocketIOProvier } from "@/context/socketio"

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { roomId: string }
}) {
    return (
        <SocketIOProvier roomId={params.roomId}>{children}</SocketIOProvier>
    )
}
