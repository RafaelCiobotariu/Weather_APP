const btn = document.getElementById("add-to-fav-btn")
btn.classList.add("not-displayed")

let weather = {
  apiKey: "457f8827370049db8c085642230504",
  fetchActualWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayActualWeather(data)
        document.querySelector(".input-check").innerText = ""
        document.getElementById("add-to-fav-btn").disabled = false
        btn.classList.remove("not-displayed")
      })
      .catch((err) => {
        console.log("There was an error: ", err)
        document.querySelector(".input-check").innerText =
          "Please write a city!"
        btn.classList.add("not-displayed")
      })
  },

  displayActualWeather: function (data) {
    const { name } = data.location
    const { icon, text } = data.current.condition
    const { feelslike_c, wind_kph, temp_c } = data.current
    document.querySelector(".city").innerText = name
    document.querySelector(".temp").innerHTML = Math.round(temp_c) + " C&#176;"
    document.querySelector(".icon").src = icon
    document.querySelector(".description").innerText = text
    document.querySelector(".feels-like").innerHTML =
      "Feels like: " +
      "<strong> " +
      Math.round(feelslike_c) +
      " C&#176;" +
      " </strong>"
    document.querySelector(".wind").innerHTML =
      "Wind: " + "<strong>" + Math.round(wind_kph) + " km/h" + " </strong>"
  },

  search: function () {
    this.fetchActualWeather(document.querySelector(".search-bar").value)
  },

  addToFav: function () {
    const cityName = document.querySelector(".city").innerText

    if (!allCity.includes(cityName)) {
      allCity.push(cityName)
    }
    localStorage.setItem("City", allCity)

    alert("City added to favorites!")
  },
}
const allCity = []

document.querySelector(".search button").addEventListener("click", function () {
  weather.search()
})

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search()
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
  weather.fetchActualWeather(
    position.coords.latitude + "," + position.coords.longitude
  )
}

document
  .getElementById("add-to-fav-btn")
  .addEventListener("click", function () {
    weather.addToFav()
  })

getLocation()
