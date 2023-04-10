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
      .then((data) => this.displayActualWeather(data))
  },

  displayActualWeather: function (data) {
    const { name } = data.location
    console.log(name)
    const { icon, text } = data.current.condition
    const { feelslike_c, wind_kph, temp_c } = data.current
    document.querySelector(".city").innerText = "Vremea in " + name
    document.querySelector(".temp").innerHTML = temp_c + " C&#176;"
    document.querySelector(".icon").src = icon
    document.querySelector(".description").innerText = text
    document.querySelector(".feels-like").innerHTML =
      "Se simte ca: " + "<strong> " + feelslike_c + " C&#176;" + " </strong>"
    document.querySelector(".wind").innerHTML =
      "Vant: " + "<strong>" + wind_kph + " km/h" + " </strong>"
  },

  search: function () {
    this.fetchActualWeather(document.querySelector(".search-bar").value)
  },
}

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

getLocation()
