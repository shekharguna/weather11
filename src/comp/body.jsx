import { useEffect, useState } from 'react'
import rain from "../assets/raining.png"
import haze from "../assets/haze.png"
import { FaSearch } from "react-icons/fa"
import air from "../assets/air.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"
import cloudy from "../assets/cloudy.png"
import clear from "../assets/sun.png"



import axios from 'axios'

function Body() {

const today=new Date()
const aaj=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()

  const [data, setData] = useState({
    celcius: "",
    windspeed: "",
    pressure: "",
    humidity: "",
    city: " ",
    date: aaj,
    condition: " ",
    country: "",
    image: " ",
  })


  const [name, setName] = useState("Chandigarh")
  
  const handleClick = () => {
    if (name !== "") {
      const apiKey = "231daab090abf3520f639122923e5ab6"
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
      axios.get(api).then((res) => {
        switch (res.data.weather[0].main) {
          case "Clear":
            data.image= clear;
            break;
          case "Clouds":
            data.image= cloudy;
            break;
          case "Rain":
            data.image= rain;
            break;
            case "Haze":
              data.image= haze;
              break;
          
        }

      console.log(res.data)
      setData({
        ...data, celcius: res.data.main.temp, windspeed: res.data.wind.speed, pressure: res.data.main.pressure, humidity: res.data.main.humidity,
        city: res.data.name, condition: res.data.weather[0].main, country: res.data.sys.country,

      })

    }
)
.catch ((err) => { console.log(err) 
alert("Invalid name (Type different name)")
})
}
}

useEffect(() => {
  handleClick(),
    console.log("useeffect done")

}, [])


return (
  <>

    <div className='bg-gradient-to-b from-slate-700 to-blue-200 w-full h-screen  font-bricolage'>
<div className=''>
      <div className=' text-3xl md:text-4xl  text-white text-center p-4'>
        Weather Forecast
      </div>
      <div className='flex flex-row justify-center '>
        <input type='text' placeholder='Search for cities' onChange={(e) => setName(e.target.value)}  className='mt-5 md:w-96 h-10 md:h-10 w-52 rounded-md text-lg md:text-xl focus:placeholder-transparent focus:outline-none' />
        <button className='hover:bg-slate-500 px-3 py-2 rounded-md mt-5 ' onClick={handleClick}><FaSearch size={25} /></button>
      </div>
      <div className='flex flex-col  items-center mt-10  mx-auto '>
        <div>
          <img src={data.image} className='h-32 w-32 md:h-40 md:w-40 animate-pulse duration-300'></img>
        </div>
        <div className='mt-4 md:mt-8'>
          <h1 className='text-6xl md:text-7xl'>{Math.round(data.celcius - 273.15)} °C</h1>
        </div>

        {/*countrysection*/}
        <div className='flex flex-col  justify-evenly items-center my-5 md:text-3xl'>
          <div>
            <h1>{data.city} [{data.country}]</h1>
          </div>
          <div>
            <h2>{data.date}</h2>
          </div>
          <div>
            <h1>{data.condition}</h1>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-10 md:gap-16 pb-16 mt-10 md:mt-0  md:text-2xl'>
          <div className='flex flex-col justify-center items-center'>
            <p className=''>{data.pressure} hPa</p>
            <img src={air} className='h-10 w-10 items-center'></img>
            <p >Pressure</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className=''>{data.humidity}%</p>
            <img src={humidity} className='h-10 w-10 items-center'></img>
            <p >Humidity</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className=''>{data.windspeed} km/h</p>
            <img src={wind} className='h-10 w-10 items-center'></img>
            <p >Wind Speed</p>
          </div>


        </div>

      </div>
      </div>
    </div>

  </>
)
}

export default Body
