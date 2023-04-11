const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })
let selectedHours = document.getElementById("hours-selector").value
function hourFormatter(date) {
  let newDate = new Date(date)
  newDate = newDate.getHours()
  return newDate
}

let hourlyWeather = {
  apiKey: "457f8827370049db8c085642230504",
  fetchForecastHourlyWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&days=2&aqi=no&alerts=no"
    )
      .then((response) => response.json())
      .then((data) => {
        renderHourlyWeather(parseHourlyWeather(data))
        document.querySelector(".input-check").innerText = ""
      })
      .catch((err) => {
        console.log("There was an error: ", err)
        document.querySelector(".input-check").innerText =
          "Please write a city!"
      })
  },
  search: function () {
    this.fetchForecastHourlyWeather(document.querySelector(".search-bar").value)
  },
}

function parseHourlyWeather({ forecast, location }) {
  return {
    city: location.name,
    hoursDay1: forecast.forecastday[0].hour.map((hour) => {
      return {
        timestamp: hourFormatter(hour.time),
        temp: Math.round(hour.temp_c),
        wind: Math.round(hour.wind_kph),
        precip: Math.round(hour.precip_mm),
        icon: hour.condition.icon,
        description: hour.condition.text,
      }
    }),
    hoursDay2: forecast.forecastday[1].hour.map((hour) => {
      return {
        timestamp: hourFormatter(hour.time),
        temp: Math.round(hour.temp_c),
        wind: Math.round(hour.wind_kph),
        precip: Math.round(hour.precip_mm),
        icon: hour.condition.icon,
        description: hour.condition.text,
      }
    }),
  }
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

const hourlySection = document.querySelector("[data-hourly-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
const actualHour = new Date().getHours()

function renderHourlyWeather(hours) {
  let index = 0
  hourlySection.innerHTML = ""
  hours.hoursDay1.forEach((hour) => {
    if (index < selectedHours) {
      if (hour.timestamp >= actualHour) {
        ++index
        const element = hourRowTemplate.content.cloneNode(true)
        element.querySelector("[data-icon]").src = hour.icon
        setValue("name", hours.city, { parent: element })
        setValue("hour", hour.timestamp + ":00", { parent: element })
        setValue("precip", hour.precip, { parent: element })
        setValue("description", hour.description, { parent: element })
        setValue("wind", hour.wind, { parent: element })
        setValue("temp", hour.temp, { parent: element })
        hourlySection.append(element)
      }
    }
  })
  selectedHours = selectedHours - index
  index = 0

  hours.hoursDay2.forEach((hour) => {
    if (index < selectedHours) {
      ++index
      const element = hourRowTemplate.content.cloneNode(true)
      element.querySelector("[data-icon]").src = hour.icon
      setValue("name", hours.city, { parent: element })
      setValue("hour", hour.timestamp + ":00", { parent: element })
      setValue("precip", hour.precip, { parent: element })
      setValue("description", hour.description, { parent: element })
      setValue("wind", hour.wind, { parent: element })
      setValue("temp", hour.temp, { parent: element })
      hourlySection.append(element)
    }
  })
}

document.querySelector(".search button").addEventListener("click", function () {
  hourlyWeather.search()
  selectedHours = document.getElementById("hours-selector").value
})

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      hourlyWeather.search()
      selectedHours = document.getElementById("hours-selector").value
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
  hourlyWeather.fetchForecastHourlyWeather(
    position.coords.latitude + "," + position.coords.longitude
  )
}

getLocation()
