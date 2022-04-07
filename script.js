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
              document.getElementById('mainContainer').classList.remove('default-bg')
              document.getElementById('iconContainer').classList.remove('default-bg')
              document.getElementById('mainContainer').classList.add('green')
              document.getElementById('iconContainer').classList.add('green')

            } else if (resp.data.current.uvi < 5) {
              document.getElementById('mainContainer').classList.remove('default-bg')
              document.getElementById('iconContainer').classList.remove('default-bg')
              document.getElementById('mainContainer').classList.add('yellow')
              document.getElementById('iconContainer').classList.add('green')

            } else {
              document.getElementById('mainContainer').classList.remove('default-bg')
              document.getElementById('iconContainer').classList.remove('default-bg')
              document.getElementById('mainContainer').classList.add('red')
              document.getElementById('iconContainer').classList.add('green')

            }

            let currentTemp = res.data.list[0].main.temp
            let currentWindSpeed = res.data.list[0].wind.speed
            let currentHumidity = res.data.list[0].main.humidity
            let currentUVI = resp.data.current.uvi
            let currentDate = res.data.list[0].dt_txt

            citySelected.innerHTML = cityName
            document.getElementById('location').innerHTML = currentDate
            document.getElementById('iconContainer').innerHTML = `<img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@2x.png" alt="weather-icon">`
            tempValue.innerHTML = currentTemp + '°F'
            windValue.innerHTML = currentWindSpeed + ' mph'
            humidityValue.innerHTML = currentHumidity
            uviValue.innerHTML = currentUVI

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
              document.getElementById('flex-container').innerHTML += `
              <div class="grid-item">
                <div class="title">${day.date}</div>
                <img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="weather-icon">
                <div class="title">Tempurature</div>
                <div class="value5">${day.temp} °F</div>
                <div class="title">Humidity</div>
                <div class="value5">${day.humidity}</div>
                </div>
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
            document.getElementById('mainContainer').classList.remove('default-bg')
            document.getElementById('iconContainer').classList.remove('default-bg')
            document.getElementById('mainContainer').classList.add('green')
            document.getElementById('iconContainer').classList.add('green')

          } else if (resp.data.current.uvi < 5) {
            document.getElementById('mainContainer').classList.remove('default-bg')
            document.getElementById('iconContainer').classList.remove('default-bg')
            document.getElementById('mainContainer').classList.add('yellow')
            document.getElementById('iconContainer').classList.add('green')

          } else {
            document.getElementById('mainContainer').classList.remove('default-bg')
            document.getElementById('iconContainer').classList.remove('default-bg')
            document.getElementById('mainContainer').classList.add('red')
            document.getElementById('iconContainer').classList.add('green')

          }

          let currentTemp = res.data.list[0].main.temp
          let currentWindSpeed = res.data.list[0].wind.speed
          let currentHumidity = res.data.list[0].main.humidity
          let currentUVI = resp.data.current.uvi
          let currentDate = res.data.list[0].dt_txt

          citySelected.innerHTML = cityName
          document.getElementById('location').innerHTML = currentDate
          document.getElementById('iconContainer').innerHTML = `<img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@2x.png" alt="weather-icon">`
          tempValue.innerHTML = currentTemp + '°F'
          windValue.innerHTML = currentWindSpeed + ' mph'
          humidityValue.innerHTML = currentHumidity
          uviValue.innerHTML = currentUVI

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
            document.getElementById('flex-container').innerHTML += `
              <div class="grid-item">
                <div class="title">${day.date}</div>
                <img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="weather-icon">
                <div class="title">Tempurature</div>
                <div class="value5">${day.temp} °F</div>
                <div class="title">Humidity</div>
                <div class="value5">${day.humidity}</div>
                </div>
              `
          })
        })
    })
})