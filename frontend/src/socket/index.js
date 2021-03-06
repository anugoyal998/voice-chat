import {io} from 'socket.io-client';

const socketInit =  ()=> {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    }
    return io(process.env.REACT_APP_API_URL || 'http://localhost:5000',options)
}

export default socketInit