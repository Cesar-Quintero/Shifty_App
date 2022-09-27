// --- State Varibales ---
// keeps track of whcih month calendar is displaying
let nav = 0;
// day that is clicked by user
let clicked = null;
//  (MINUTE ?) THIS COULD GRAB DATA OBJECTS FROM DATABASE
// events stored in local storage
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// --- Global Const Varibales ---
// calendar
const calendar = document.getElementById('calendar');
// variable targeting the #newEventModel element
const newEventModal = document.getElementById('newEventModal');
// variable targeting the #deleteEvent element
const deleteEventModal = document.getElementById('deleteEventModal');
// variable targeting the #modelBackDrop element
const backDrop = document.getElementById('modalBackDrop');
// variable targeting the #eventTitleInput element
const eventTitleInput = document.getElementById('eventTitleInput');
// days of the week
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// --- Reusable Functions ---
// on click for day opens a modal for creating an event
function openModal(date) {
  // clicked becomes the day clicked
  clicked = date;
  
  // MINUTE 40 (when he talks about it)... this finds the event in local storage that has the same day as the one clicked
  const eventForDay = events.find(e => e.date === clicked);

  // if eventForDay is found in local storage then insert its title name inside the p tags with #eventText
  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;

    // set deleteEventModal's display to block
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

// on load grab date data and render calendar
function load() {
  const dt = new Date();

  // if nav is not current month then make the month (current month plus or minus nav)
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  // first day of current's month returned as a string along with year and month
  const firstDayOfMonth = new Date(year, month, 1);
  // days the days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // string of first day of month with numeric date as MM/DD/YYY
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  // the empty days that fill up calendar space beforet the actual days of the calendar are rendered (display is set to none)
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  // grab <div id="monthDisplay"></div> and display month and year
  document.getElementById('monthDisplay').innerText = 
  `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';
  
  // for loop to loop through (padding days + days in month) and render the squares of a presentable calendar
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    // every i a square is created with class 'day'
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    // the date as a string in format MM/DD/YYY
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    // if i is more than paddingDays then crate
    if (i > paddingDays) {
      // add number to days that are not padding days
      daySquare.innerText = i - paddingDays;

      // MINUTE 53 - YOU CAN CHECK IF DATABASE HAS EVENT
      // checks if the square (day) that is clicked has an event already in there or not returning true or false
      const eventForDay = events.find(e => e.date === dayString);

      // if the i is equal to todays day number and the month is today's then give #currentDay to this specific day square because it's today (it hightlights it showing it's today)
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      //if there is event on sqaure (day) clicked then create div with .event class
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      // for every square add click event to open modal
      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      // add class 'padding' to padding days
      daySquare.classList.add('padding');
    }
    
    // every i append square to calendar
    calendar.appendChild(daySquare)
  }

}

// function to close the modals
function closeModal() {
  // if input for event modal has a value remove error
  eventTitleInput.classList.remove('error')
  // set displays for modal and backDrop to done
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  // reset value to input to nothing
  eventTitleInput.value = '';
  // reset clicked value to none
  clicked = null;
  load();
};

// MINUTE 47:52
// COULD BE A POST REQUEST FOR SERVER maybe with fetch or another alternative
function saveEvent() {
  // if input for event modal has a value remove error 
 if (eventTitleInput.value) {
  eventTitleInput.classList.remove('error');

  // THIS IS THE PART TO PUSH EVENT TO DATABASE
  // pushes input value (event name and date clicked) into EVENTS aray
  events.push({
    // saving the date that was clicked as string
    date: clicked,
    // saving name of event as inputed inside of the input in modal
    title: eventTitleInput.value,
  });

  // set items of EVENTS ARRAY inside of localStorage
  localStorage.setItem('events', JSON.stringify(events));
  // close modal after saving it with closeModal() function
  closeModal();
 } else {
   eventTitleInput.classList.add('error')
 }
}

// MINUTE 56 - DELETE REQUEST CAN GO HERE
// delete function to delete event from storage
function deleteEvent() {
  // filter events array by not including the clicked events
  events = events.filter(e => e.date !== clicked);
  // set again the events array inside of local storage
  localStorage.setItem('events', JSON.stringify(events));
  // close modal after clicking delete button
  closeModal();
}

// click events for switching between months
function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });
  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });
  

  // MINUTE 46:52
  //COULD BE A POST REQUEST FOR SERVER
  // save button for modal
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  // cancel button for modal
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  // delete button for modal
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  // close button for modal
  document.getElementById('closeButton').addEventListener('click', closeModal);
}


initButtons();
load();


function firstNonConsecutive(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i-1] + 1  !== arr[i]) {
      return arr[i];
    }
  }
  return null;
}