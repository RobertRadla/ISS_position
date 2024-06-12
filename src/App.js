import { useState, useEffect } from "react"



const App = () => {
  const url = "http://api.open-notify.org/iss-now.json"
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [urlMap, setUrlMap] = useState("")

  const getCoordinates = async() => {
      const response = await fetch(url)
      const data = await response.json()
      setLatitude(data["iss_position"]["latitude"])
      setLongitude(data["iss_position"]["latitude"])
      setUrlMap(`https://mapy.cz/zakladni?x=${latitude}&y=${longitude}&z=8`)
  }

  useEffect( () => {
    getCoordinates()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>Poloha ISS v aktuálním čase</h1>
      </header>

      <div className="content">
        <h2>Zeměpisná šířka</h2>
          <p>{latitude}</p>
        <h2>Zeměpisná délka</h2>
          <p>{longitude}</p> 
         <a className="link" href={urlMap} target="_blank">Poloha ISS v mapách</a> 
      </div>

      <footer className="footer">

      </footer>
    </div>
  )
}


export default App


/** Proč je v console.log ["iss_position"]["latitude"] ?????  
 * Protože objekt, který přišel vypadá takto (latitude + longitude jsou obejekt v objektu):
 * {
  "message": "success", 
  "timestamp": UNIX_TIME_STAMP, 
  "iss_position": {
    "latitude": CURRENT_LATITUDE, 
    "longitude": CURRENT_LONGITUDE
  }
} **/


  /* Jak kód funguje: 
  1. pracuje useState a vypíše prázdné stringy za latitude a longitude
  2. pracuje return a vypíše se stránka
  3. začne fungovat useEffect a spustí průběh funkce getCoordinates
  4. zapůsobí useEffect a resetuje se celá stránka
  5. stane se vše znovu, akorát se proces zastaví u useEffect, kvůli části ,[] - ta říká, že se useEffect spustí pouze jednou a zastaví se tím cyklus */