const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" })
function dateFormatter(date) {
  let newDate = new Date(date)
  newDate =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear()
  return newDate
}

let dailyWeather = {
  apiKey: "457f8827370049db8c085642230504",
  fetchForecastDailyWeather: function (city, days) {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&days=" +
        days +
        "&aqi=no&alerts=no"
    )
      .then((response) => response.json())
      .then((data) => {
        renderDailyWeather(parseDailyWeather(data))
      })
  },

  search: function () {
    this.fetchForecastDailyWeather(
      document.querySelector(".search-bar").value,
      document.querySelector(".days-selector").value
    )
  },
}

function parseDailyWeather({ forecast, location }) {
  return forecast.forecastday.map((forecastDay) => {
    return {
      name: location.name,
      date: dateFormatter(forecastDay.date),
      weekday: DAY_FORMATTER.format(forecastDay.date_epoch * 1000),
      temp: Math.round(forecastDay.day.avgtemp_c),
      wind: Math.round(forecastDay.day.maxwind_kph),
      precip: Math.round(forecastDay.day.totalprecip_mm),
      icon: forecastDay.day.condition.icon,
      description: forecastDay.day.condition.text,
    }
  })
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

const dailySection = document.querySelector("[data-daily-section]")
const dayRowTemplate = document.getElementById("day-row-template")

function renderDailyWeather(days) {
  dailySection.innerHTML = ""
  days.forEach((day) => {
    const element = dayRowTemplate.content.cloneNode(true)
    element.querySelector("[data-icon]").src = day.icon
    setValue("name", day.name, { parent: element })
    setValue("day", day.weekday, { parent: element })
    setValue("date", day.date, { parent: element })
    setValue("description", day.description, { parent: element })
    setValue("precip", day.precip, { parent: element })
    setValue("wind", day.wind, { parent: element })
    setValue("temp", day.temp, { parent: element })
    dailySection.append(element)
  })
}

document.querySelector(".search button").addEventListener("click", function () {
  dailyWeather.search()
})

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      dailyWeather.search()
    }
  })

document.querySelector("body")
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}
function showPosition(position) {
  dailyWeather.fetchForecastDailyWeather(
    position.coords.latitude + "," + position.coords.longitude,
    1
  )
}

getLocation()
