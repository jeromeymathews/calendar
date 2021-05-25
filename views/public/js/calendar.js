// Month Names
const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

const activeMonth = document.getElementById("calendarLink");
activeMonth.classList.add("active");

function daysInMonth(month, year) {
    month++;
    return new Date(year, month, 0).getDate();
}

function firstDayInMonth(month, year) {
    return new Date(year, month).getDay();
}

function previousMonth(month, year) {
    let numMonth = monthNames.indexOf(month);
    let numYear = parseInt(year);
    let newYear = (numMonth === 0) ? numYear - 1 : numYear;
    let newMonth = (numMonth === 0) ? 11 : numMonth - 1;
    showCalendar(monthNames[newMonth], newYear);
}

function nextMonth(month, year) {
    let numMonth = monthNames.indexOf(month);
    let numYear = parseInt(year);
    let newYear = (numMonth === 11) ? numYear + 1 : numYear;
    if (numMonth === 11) {
        numMonth = 0;
    }
    else {
        numMonth++;
    }
    showCalendar(monthNames[numMonth], newYear);
}

function getWeeksInMonth(month, year) {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
}

function addDate(month, date, year) {
    console.log(`${month} ${date}, ${year}`);
}

function showCalendar(month, year) {
    //Get all dates for the reqeusted month
    let txtMonth = document.getElementById("month");
    let txtYear = document.getElementById("year");
    txtMonth.innerHTML = month;
    txtYear.innerHTML = year;
    thisMonth = monthNames.indexOf(month);
    let tableBody = document.getElementById("tblBody");
    const lastDay = daysInMonth(thisMonth, year);
    const today = new Date();
    let date = 1;
    firstDay = firstDayInMonth(thisMonth, year);
    tableBody.innerHTML = "";
    const weeksInMonth = getWeeksInMonth(thisMonth, year);
    for (let i = 0; i < weeksInMonth; i++) {
        //create table row
        let row = document.createElement("tr");
        //create cells
        for (let j = 0; j < 7; j++) {
            let eventSpanData = ``;
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.classList.add("bg-dark");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > lastDay) {
                break;
            }
            else {
                events.forEach(event => {
                    const getMonth = event.dateData.date.indexOf(" ");
                    const eventMonth = event.dateData.date.slice(0, getMonth);
                    const getDate = parseInt(event.dateData.date.slice(getMonth + 1));
                    const eventMonthData = `${event.dateData.data}`;
                    if (eventMonth === month && getDate === date) {
                        eventSpanData = eventMonthData;
                    }
                    else {
                        // const eventData = event.dateData.data;
                        // const eventDate = eventMonthDay;
                        // 
                        // console.log(`not eventMonth && getDate`);
                        // break;
                    }
                    if (eventSpanData) {
                        return
                    }
                });
                // console.log(`${date} ${eventSpanData}`);
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                let cellSpan = document.createElement("span");
                let eventSpan = document.createElement("span");
                if (eventSpanData) {
                    eventText = document.createTextNode(eventSpanData);
                    eventSpan.appendChild(eventText);
                    eventSpan.classList.add("d-block");
                    // eventSpan.classList.add("border");
                }
                cellSpan.classList.add("d-block");
                cellSpan.classList.add("border");
                if (date === today.getDate() && parseInt(year) === today.getFullYear() && thisMonth === today.getMonth()) {
                    cell.classList.add("today");
                    cellSpan.classList.remove("border");
                }
                cellSpan.appendChild(cellText);
                cellSpan.addEventListener("click", () => {
                    addDate(month, date, year);
                });
                cell.appendChild(cellSpan);
                if (eventSpanData) {
                    cell.appendChild(eventSpan);
                }
                row.appendChild(cell);
                date++;
            }
        }
        //append row to the body
        tableBody.appendChild(row);
    }
}

document.getElementById("previousMonth").addEventListener("click", () => {
    let month = document.getElementById("month").innerHTML;
    let year = document.getElementById("year").innerHTML;
    previousMonth(month, year);
});
document.getElementById("nextMonth").addEventListener("click", () => {
    let month = document.getElementById("month").innerHTML;
    let year = document.getElementById("year").innerHTML;
    nextMonth(month, year);
});

showCalendar(month, year);