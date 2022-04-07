const APIKEY = '97fb53647d7394c4b972bd222a35611d'

const citySelected = document.getElementById('citySelected')
const tempValue = document.getElementById('tempValue')
const windValue = document.getElementById('windValue')
const humidityValue = document.getElementById('humidityValue')
const uviValue = document.getElementById('uviValue')


let UserCities = JSON.parse(localStorage.getItem('storedCities')) || []

UserCities.forEach(city => {
  document.getElementById('searchHistory').innerHTML += `
  <p data-city='${city}' class='stored'> ${city} </p>`
})

document.addEventListener('click', () => {
  if (event.target.classList.contains('stored')) {
    let cityName = event.target.dataset.city
    console.log(cityName)

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKEY}`)
      .then(res => {
        console.log(res.data)
        let lat = res.data.city.coord.lat
        let lon = res.data.city.coord.lon

        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
          .then(resp => {
            console.log(resp.data)

            let uviColor
            if (resp.data.current.uvi < 2) {
              uviColor = 'green'
            } else if (resp.data.current.uvi < 5) {
              uviColor = 'yellow'
            } else {
              uviColor = 'red'
            }

            let currentTemp = res.data.list[0].main.temp
            let currentWindSpeed = res.data.list[0].wind.speed
            let currentHumidity = res.data.list[0].main.humidity
            let currentUVI = resp.data.current.uvi

            tempValue.innerHTML = currentTemp + '°F'
            windValue.innerHTML = currentWindSpeed + ' mph'
            humidityValue = currentHumidity
            uviValue = currentUVI

            document.getElementById('currentDiv').innerHTML = `
      <p>City Name = ${res.data.city.name}</p>
      <p>Date = ${res.data.list[0].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png">
      <p>Temperature = ${res.data.list[0].main.temp} °F</p>
      <p>Humidity = ${res.data.list[0].main.humidity}</p>
      <p>Wind Speed = ${res.data.list[0].wind.speed} mph</p>
      <p class='${uviColor}'>UV = ${resp.data.current.uvi}</p>
      `

            let weatherArry = []
            let day1 = {
              date: res.data.list[8].dt_txt,
              icon: res.data.list[8].weather[0].icon,
              temp: res.data.list[8].main.temp,
              humidity: res.data.list[8].main.humidity
            }

            let day2 = {
              date: res.data.list[16].dt_txt,
              icon: res.data.list[16].weather[0].icon,
              temp: res.data.list[16].main.temp,
              humidity: res.data.list[16].main.humidity
            }

            let day3 = {
              date: res.data.list[24].dt_txt,
              icon: res.data.list[24].weather[0].icon,
              temp: res.data.list[24].main.temp,
              humidity: res.data.list[24].main.humidity
            }

            let day4 = {
              date: res.data.list[32].dt_txt,
              icon: res.data.list[32].weather[0].icon,
              temp: res.data.list[32].main.temp,
              humidity: res.data.list[32].main.humidity
            }

            let day5 = {
              date: res.data.list[39].dt_txt,
              icon: res.data.list[39].weather[0].icon,
              temp: res.data.list[39].main.temp,
              humidity: res.data.list[39].main.humidity
            }

            weatherArry.push(day1, day2, day3, day4, day5)
            console.log(weatherArry)

            weatherArry.forEach(day => {
              document.getElementById('fiveDay').innerHTML += `
        <hr>
        <p>Date = ${day.date}</p>
        <img src="http://openweathermap.org/img/wn/${day.icon}@4x.png">
        <p>Temperature = ${day.temp} °F</p>
        <p>Humidity = ${day.humidity}</p>
        `
            })
          })
      })
  }
})

document.getElementById('searchBtn').addEventListener('click', () => {
  let cityName = document.getElementById('cityName').value

  let storedCities = JSON.parse(localStorage.getItem('storedCities')) || []
  storedCities.push(cityName)
  localStorage.setItem('storedCities', JSON.stringify(storedCities))

  console.log(cityName)
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKEY}`)
    .then(res => {
      console.log(res.data)
      let lat = res.data.city.coord.lat
      let lon = res.data.city.coord.lon

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
        .then(resp => {
          console.log(resp.data)

          let uviColor
          if (resp.data.current.uvi < 2) {
            uviColor = 'green'
          } else if (resp.data.current.uvi < 5) {
            uviColor = 'yellow'
          } else {
            uviColor = 'red'
          }

          document.getElementById('currentDiv').innerHTML = `
      <p>City Name = ${res.data.city.name}</p>
      <p>Date = ${res.data.list[0].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png">
      <p>Temperature = ${res.data.list[0].main.temp} °F</p>
      <p>Humidity = ${res.data.list[0].main.humidity}</p>
      <p>Wind Speed = ${res.data.list[0].wind.speed} mph</p>
      <p class='${uviColor}'>UV = ${resp.data.current.uvi}</p>
      `

          let weatherArry = []
          let day1 = {
            date: res.data.list[8].dt_txt,
            icon: res.data.list[8].weather[0].icon,
            temp: res.data.list[8].main.temp,
            humidity: res.data.list[8].main.humidity
          }

          let day2 = {
            date: res.data.list[16].dt_txt,
            icon: res.data.list[16].weather[0].icon,
            temp: res.data.list[16].main.temp,
            humidity: res.data.list[16].main.humidity
          }

          let day3 = {
            date: res.data.list[24].dt_txt,
            icon: res.data.list[24].weather[0].icon,
            temp: res.data.list[24].main.temp,
            humidity: res.data.list[24].main.humidity
          }

          let day4 = {
            date: res.data.list[32].dt_txt,
            icon: res.data.list[32].weather[0].icon,
            temp: res.data.list[32].main.temp,
            humidity: res.data.list[32].main.humidity
          }

          let day5 = {
            date: res.data.list[39].dt_txt,
            icon: res.data.list[39].weather[0].icon,
            temp: res.data.list[39].main.temp,
            humidity: res.data.list[39].main.humidity
          }

          weatherArry.push(day1, day2, day3, day4, day5)
          console.log(weatherArry)

          weatherArry.forEach(day => {
            document.getElementById('fiveDay').innerHTML += `
        <hr>
        <p>Date = ${day.date}</p>
        <img src="http://openweathermap.org/img/wn/${day.icon}@4x.png">
        <p>Temperature = ${day.temp} °F</p>
        <p>Humidity = ${day.humidity}</p>
        `
          })
        })
    })
})