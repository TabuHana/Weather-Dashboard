const APIKEY = '97fb53647d7394c4b972bd222a35611d'

document.getElementById('searchBtn').addEventListener('click', () => {
  let cityName = document.getElementById('cityName').value
  console.log(cityName)
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`)
  .then(res => {
    console.log(res.data)
  })
})