// DOM Elements
const time = document.querySelector('.time'),
  fullTime = document.querySelector('.fullTime'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  hours = document.querySelector('#hours'),
  minutes = document.querySelector('#minutes'),
  seconds = document.querySelector('#seconds'),
  btnImg = document.querySelector('.btn-img'),
  note = document.querySelector('.note'),
  closeNoteBtn = document.querySelector('.close'),
  noteBlock = document.querySelector('.note-block');
  
// Set Notes, not right(better e.target), but very fast and easy)))) i want to sleep


// image arrays
const morningBase = './assets/images/morning/';
const afternoonBase = './assets/images/fday/';
const eveningBase = './assets/images/evening/';
const nightBase = './assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let imagesArray = [];

function arrMaker(arr) {
  shuffle(images);

  for (let i = 0; i < 6; i++){
    let current = arr[i];
        if (!~imagesArray.indexOf(current)) {
          imagesArray.push(`${morningBase}${current}`)
          imagesArray.push(`${afternoonBase}${current}`)
          imagesArray.push(`${eveningBase}${current}`)
          imagesArray.push(`${nightBase}${current}`)
        }
  }
  imagesArray.sort().reverse();
}
arrMaker(images);

// Options
const showAmPm = false;

let imageSrc;
  
// Show Time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  // 12hr or 24hr Format
  hour = hour % 24 || 0;

  // Output Time
  hours.innerHTML = `${addZero(hour)}<span>:</span>`;
  minutes.innerHTML = `${addZero(min)}<span>:</span>`;
  seconds.innerHTML = `${addZero(sec)}`;

  setTimeout(showTime, 1000);

  if (min === 0 && sec === 0) {
    setBgGreet();
}

// Morning
  if (hour >= 6 && hour < 12) { 
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = "white";
}

// Afternoon Change
  if (hour >= 12 && hour < 18) { 
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = "white";
}

// Evening Change
  if (hour >= 18 && hour < 24) {
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }

// Night Change
  if (hour >= 0 && hour < 6) {
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
}

console.log(imagesArray)

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(),
    index = hour;
  imageSrc = imagesArray[index];
  document.body.style.backgroundImage = `url(${imageSrc})`;
}

async function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = await src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

let today = new Date();
  let hour = today.getHours();
let i = hour;
function getImage() {

  let index = i % imagesArray.length; 
  let imageSrc = imagesArray[index];
  
  viewBgImage(imageSrc);
  i++;
  btnImg.disabled = true;
  setTimeout(function () {
    btnImg.disabled = false;
  }, 1000);
} 

btnImg.addEventListener('click', getImage);

function showDay() {
  let today = new Date(),
    day = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthName = ["January", "February", "March", "April", "May", "June", "July",
"August","September","October","November","December"],
    dayZ = dayName[day],
    monthZ = monthName[month];

  fullTime.innerHTML = `${dayZ}, ${dayNum} ${monthZ}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Get Name
function getName() {
  
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }

}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent !== '') {
      localStorage.setItem('name', e.target.innerText);
    } else {
      name.textContent = '[Enter Name]';
    }
      name.blur();
    }
  } else {
    if (name.textContent !== '') {
      localStorage.setItem('name', e.target.innerText);
    } else {
      name.textContent = '[Enter Name]';
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent !== '') {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      } else {
        focus.textContent = '[Enter Focus]';
      }
    }
  } else {
    if (focus.textContent !== '') {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      } else {
        focus.textContent = '[Enter Focus]';
      }
  }
}

// Get Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const feelLike = document.querySelector('.feel-like');
const humidity = document.querySelector('.humidity-rel');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const cityError = document.querySelector('.city-error');

async function getWeather() {  
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=d69749b2442f35b40ec6f15a67d6a8fb&units=metric`;
  
    const res = await fetch(weatherUrl);

    if (!res.ok) {
      cityError.style.opacity = 0.9;
      temperature.classList.add('error');
      feelLike.classList.add('error');
      humidity.classList.add('error');
      weatherDescription.classList.add('error');
      windSpeed.classList.add('error');
    } else {
      cityError.style.opacity = 0;
      temperature.classList.remove('error');
      feelLike.classList.remove('error');
      humidity.classList.remove('error');
      weatherDescription.classList.remove('error');
      windSpeed.classList.remove('error');
    }
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feelLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `Humidity ${data.main.humidity} %`;
    windSpeed.textContent = `Wind speed ${data.wind.speed} m/s`;
    weatherDescription.textContent = data.weather[0].description;
  
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (city.textContent !== '') {
      localStorage.setItem('city', e.target.innerText);
    } else {
      city.textContent = '[Enter City]';
      }
      getWeather();
      city.blur();
    }
  } else {
    if (city.textContent !== '') {
      localStorage.setItem('city', e.target.innerText);
    } else {
      city.textContent = '[Enter City]';
    }
  }
}

// Get City
function getCity() {
  
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }

}

// Get Note (need e.target of course, but time)))
function setNote(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('note', e.target.value);
    }
  }   
}

function getNote() {
  if (localStorage.getItem('note') !== null) {
    note.textContent = localStorage.getItem('note');
  }
}


// get quote
const blockquote = document.querySelector('.blockq');
const figcaption = document.querySelector('.figc');
const btnQuote = document.querySelector('.btn-q');

function getQuote() {
  let quoteIndex = Math.floor(Math.random() * 1640);
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      blockquote.textContent = data[quoteIndex].text;
      figcaption.textContent = data[quoteIndex].author;
    });
}

//  let timerQuote = setInterval(() => getQuote(), 20000);
  

// shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('focus', function () {
  city.textContent = '';
});
city.addEventListener('blur', function () {
  if (city.textContent === '') {
    city.textContent = localStorage.getItem('city');
  }
});
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
name.addEventListener('focus', function () {
  name.textContent = "";
});
name.addEventListener('blur', function () {
  if (name.textContent === '') {
    name.textContent = localStorage.getItem('name');
  }
});
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', function () {
  focus.textContent = '';
});
focus.addEventListener('blur', function () {
  if (focus.textContent === '') {
    focus.textContent = localStorage.getItem('focus');
  }
});
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

note.addEventListener('keypress', setNote);

closeNoteBtn.addEventListener('click', function () {
  noteBlock.classList.add('hidden');
})

// Run
showTime();
showDay();
getName();
getFocus();
getCity();
getNote();
setBgGreet();
