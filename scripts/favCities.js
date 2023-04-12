const cities = localStorage.getItem("City")

const citiesArr = cities.split(",")
citiesArr.map((item) => {
  const newPara = document.createElement("p")
  newPara.innerHTML = item
  document.querySelector(".city").appendChild(newPara)
})

console.log(citiesArr)

// document.querySelector(".city").innerHTML = cities
