'use strict';
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = process.env.PORT || 3000;

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const months = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
];
const titleName = 'Mathews';

//test dates will work mongodb into project
const dates = [
    {
        id: 1,
        dateData: {
            date: "March 13",
            data: "Jeromey's bday"
        }
    },
    {
        id: 2,
        dateData: {
            date: "June 3",
            data: "Katie's bday"
        }
    },
    {
        id: 3,
        dateData: {
            date: "August 7",
            data: "Melissa's bday"
        }
    },
    {
        id: 4,
        dateData: {
            date: "November 5",
            data: "Rowan's bday"
        }
    }
];

mongoose.connect('mongodb://127.0.0.1:27017/calendar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Mathews calendar connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('views/public'));

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //Find all upcoming dates, 
    //Send all dates through to the home page
    res.render('home', {
        title: `${titleName}`,
        dates: dates,
        scriptPartial: ""
    });
});

app.get('/calendar', (req, res) => {
    //Get dates from this month and send to calendar page
    res.render('calendar', {
        title: `${titleName} calendar`,
        month: months[month],
        year: year,
        events: JSON.stringify(dates),
        scriptPartial: '<script src="../js/calendar.js"></script>'
    });
});

app.get('/chat', (req, res) => {
    res.render('chat', {
        title: `${titleName} chat`,
        scriptPartial: '<script src="/socket.io/socket.io.js"></script><script src="../js/chat.js"></script>'
    });
});

app.get('/video', (req, res) => {
    res.render('video', {
        title: `${titleName} video`,
        scriptPartial: '<script src="../js/video.js"></script>'
    });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', {
        title: `${titleName} gallery`,
        scriptPartial: '<script src="../js/gallery.js"></script>'
    });
});

io.on('connection', async (socket) => {
    const offset = socket.handshake.auth.offset;
    if (offset) {
        //this is a reconnections
        console.log('User reconnected');
        for (const event of await fetchMissedEventsFromDatabase(offset)) {
            socket.emit('my-event', event);
        }
    }
    else {
        //this is a new connection
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected')
        });
        socket.on('chat message', (msg) => {
            io.emit('chat message', (msg));
        });
    }
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});