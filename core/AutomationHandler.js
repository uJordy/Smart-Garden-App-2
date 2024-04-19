import React, { useState, useEffect } from 'react';
import useStore from '../stores/garden'

const checkAutomations = () => {

  const [autoTimer, setAutoTimer] = useState(new Date())

  useEffect(() => {
    setTimeout(() => {
      setAutoTimer(new Date())
    }
      , 10000)
  }, [autoTimer])


  getAutomationList = useStore((state) => state.getAutomationList)
  
  for (const [key, item] of Object.entries(getAutomationList())) {

    console.log(item.Enabled)
    if (item.Enabled === false) return;

    autoTime = new Date(item.Time) //time from automation
    currentTime = new Date() //UTC +00:00

    x = currentTime.getDay()

    weekday = currentTime.toLocaleString("en-EN", { weekday: "long" })

    if (item.DaySelected[weekday] === true) {
      console.log("day is matched")

      console.log(autoTime.getHours())
      console.log(currentTime.getHours())
      if (autoTime.getHours() === currentTime.getHours()) {
        console.log("hours matched")
        if (autoTime.getMinutes() === currentTime.getMinutes()) {
          console.log("minutes matched")

          console.log("automation name running!")
          console.log(item.Name)
        }
      }
    }
  }

  // setTimeout(5000)
}

// }
// }


export default checkAutomations;