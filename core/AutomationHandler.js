
import useStore from '../stores/garden';
import hash from 'hash-it';


const checkAutomations = (getAutomationList, invokeAutomation) => {

  console.log("Checking automations...")

  for (const [key, item] of Object.entries(getAutomationList())) {

    console.log(item.Enabled)
    if (item.Enabled === false) continue;

    autoTime = new Date(item.Time) //time from automation
    currentTime = new Date() //UTC +00:00

    x = currentTime.getDay()

    weekday = currentTime.toLocaleString("en-EN", { weekday: "long" })


    if (item.DaySelected[weekday] === true) {

      console.log("day is matched")

      if (autoTime.getHours() === currentTime.getHours()) {

        if (autoTime.getMinutes() === currentTime.getMinutes()) {

          if (item.LastRan !== null) {
            if (item.LastRan.constructor !== Date) item.LastRan = new Date(item.LastRan)
            if (item.LastRan.getMonth() === currentTime.getMonth()) { //Check to see if automation has already been ran today
              if (item.LastRan.getDate() === currentTime.getDate()) {
                console.log("ran already today!")
                continue
              }
            }
          }
          console.log("minutes matched")

          console.log("automation name running!")
          console.log(item.Name)
          invokeAutomation(key, item.Type, item.Value)
        }
      }
    }
  }
}



export default checkAutomations;