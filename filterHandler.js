// Initialize the calendar
const calendarContainer = document.getElementById("calendarContainer");
const daysContainer = document.getElementById("daysContainer");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// Populate years dynamically
const currentYear = new Date().getFullYear();
for (let year = currentYear - 50; year <= currentYear + 50; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  if (year === currentYear) option.selected = true;
  yearSelect.appendChild(option);
}

// Get the total days in a month
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Render the calendar days
function renderCalendar() {
  const selectedMonth = parseInt(monthSelect.value);
  const selectedYear = parseInt(yearSelect.value);
  const totalDays = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  // Clear previous days
  daysContainer.innerHTML = "";

  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  // Add actual days
  for (let day = 1; day <= totalDays; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.className =
      "p-2 text-gray-800 bg-white rounded-md shadow hover:bg-blue-100 cursor-pointer";
    daysContainer.appendChild(dayDiv);
  }
}

// Update the calendar when month/year is changed
monthSelect.addEventListener("change", renderCalendar);
yearSelect.addEventListener("change", renderCalendar);

// Handle previous and next buttons
prevMonthBtn.addEventListener("click", () => {
  if (monthSelect.value == 0) {
    monthSelect.value = 11;
    yearSelect.value = parseInt(yearSelect.value) - 1;
  } else {
    monthSelect.value = parseInt(monthSelect.value) - 1;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  if (monthSelect.value == 11) {
    monthSelect.value = 0;
    yearSelect.value = parseInt(yearSelect.value) + 1;
  } else {
    monthSelect.value = parseInt(monthSelect.value) + 1;
  }
  renderCalendar();
});

// Initialize the calendar on load
renderCalendar();
