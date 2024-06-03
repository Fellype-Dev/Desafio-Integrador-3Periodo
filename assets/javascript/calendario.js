document.addEventListener("DOMContentLoaded", function () {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const today = new Date();
    const currentYear = today.getFullYear();

    function createCalendar(year, month) {
        let calendar = document.createElement("div");
        calendar.className = "month";

        let monthHeader = document.createElement("div");
        monthHeader.className = "month-header";
        monthHeader.innerText = `${months[month]} ${year}`;
        calendar.appendChild(monthHeader);

        let days = document.createElement("div");
        days.className = "days";

        let firstDay = new Date(year, month, 1).getDay();
        let numDays = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            let emptyDay = document.createElement("div");
            emptyDay.className = "day";
            days.appendChild(emptyDay);
        }

        for (let i = 1; i <= numDays; i++) {
            let day = document.createElement("div");
            day.className = "day";
            day.innerText = i;
            day.addEventListener("click", function () {
                openEventModal(year, month, i);
            });
            days.appendChild(day);
        }

        calendar.appendChild(days);
        document.getElementById("calendar").appendChild(calendar);
    }

    function openEventModal(year, month, day) {
        let eventDate = document.getElementById("eventDate");
        eventDate.value = `${months[month]} ${day}, ${year}`;
        $('#eventModal').modal('show');
    }

    function addEvent(event) {
        event.preventDefault();
        let date = document.getElementById("eventDate").value;
        let [monthName, day, year] = date.split(' ');
        let month = months.indexOf(monthName);
        day = parseInt(day.replace(',', ''));

        let days = document.querySelectorAll(".day");
        days.forEach(dayElement => {
            let dayNumber = parseInt(dayElement.innerText);
            if (dayNumber === day && month === today.getMonth() && year == currentYear) {
                dayElement.classList.add("selected");
            }
        });

        $('#eventModal').modal('hide');
    }

    createCalendar(currentYear, today.getMonth());

    document.getElementById("eventForm").addEventListener("submit", addEvent);

    $('#sidebarToggle').click(function () {
        $('#sidebar').toggleClass('show');
    });
});

