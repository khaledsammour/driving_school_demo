import { Server } from "socket.io"

export async function GET(_req, res) {
    const PORT = 3003

    console.log("Starting Socket.IO server on port:", PORT)

    const io = new Server({ path: "/api/socket", addTrailingSlash: false, cors: { origin: "*" } }).listen(PORT)
    io.disconnect();
    io.on('disconnect', () => {
        console.log('Disconnected');
    });
    io.on("connect", socket => {
        const _socket = socket
        console.log("socket connect", socket.id)
        _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`)
        socket.on("disconnect", async () => {
            console.log("socket disconnect")
        })
    })

    // res.socket.server.io = io
    // res.status(201).json({ success: true, message: "Socket is started", socket: `:${4000}` })
}