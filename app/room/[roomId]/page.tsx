export default function Page({params}: {params: {roomId: string}}) {
    return (
        <div>
            <h1>Room {params.roomId}</h1>
        </div>
    )

}