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

//test dates will work mongodb into project
const dates = [
    {
        id: 1,
        dateData: {
            date: "March 13",
            data: "Jer's bday"
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

mongoose.connect('mongodb://localhost:27017/mathewsCalendar', {
    useNewUrlParser: true,
    useCreateIndex: true,
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
// const io = require('socket.io')(http);

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);

app.get('/', (req, res) => {
    //Find all upcoming dates, 
    //Send all dates through to the home page
    // res.set('Cache-control', 'public, max-age=150');
    res.render('home', {
        title: "Mathews",
        dates: dates,
        scriptPartial: ""
    });
});

app.get('/calendar', (req, res) => {
    //Get dates from this month and send to calendar page
    res.render('calendar', {
        title: "Mathews calendar",
        month: months[month],
        year: year,
        events: JSON.stringify(dates),
        scriptPartial: '<script src="../js/calendar.js"></script>'
    });
});

app.get('/chat', (req, res) => {
    res.render('chat', {
        title: "Mathews chat",
        scriptPartial: '<script src="/socket.io/socket.io.js"></script><script src="../js/chat.js"></script>'
    });
});

app.get('/video', (req, res) => {
    res.render('video', {
        title: "Mathews video",
        scriptPartial: '<script src="../js/video.js"></script>'
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});