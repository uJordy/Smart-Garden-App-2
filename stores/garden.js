//Zustand stores with persistant storage

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hash from 'hash-it';


var GardenData = {};

GardenData = sgDictExample; // Overwrite saved data
const generateSampleData = true; //Historical data


//LastChanged var is for "simulating" garden sensor changing to its target value
//Smart Garden base data
var sgDictExample = {
  Temperature: { //Celcius 
    Value: 0, //Current (Target value)
    PrevValue: 0, //This for simulation only. This acts like the sensor
    LastChanged: new Date(), //Last time when end user changes garden prop value
    History: []
  },
  Light: { //Percentage
    Value: 0,
    PrevValue: 0,
    LastChanged: new Date(),
    History: []
  },
  SoilMoisture: { //Percentage
    Value: 0,
    PrevValue: 0,
    LastChanged: new Date(),
    History: []
  },
  Humidity: { //Percentage
    Value: 0,
    PrevValue: 0,
    LastChanged: new Date(),
    History: []
  },
  Automations: {

    // const name = "Automation Example 3"
    // const hashValue = hash(name)

    // sgDictExample.Automations[hashValue] = {
    //   Name: "Automation Example 3",
    //   Enabled: false,
    //   Type: "Soil Moisture",
    //   Value: 30,
    //   Time: "2024-04-18T21:45:00.000Z",
    //   DaySelected: {
    //     ["Monday"]: true,
    //     ["Tuesday"]: true,
    //     ["Wednesday"]: true,
    //     ["Thursday"]: true,
    //     ["Friday"]: true,
    //     ["Saturday"]: false,
    //     ["Sunday"]: false,
    //   },
    //   Id: hashValue,
    //   LastRan: null
    // }
  },
  LastWatered: null,
  BlindsOpen: true
}

function generateRandom(min, max) {
  let difference = max - min;

  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
}

//Maths function
function lerp(a, b, alpha) {
  return a + alpha * (b - a)
}
const clamp = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

//Returns last week's data for each sensor within min and max ranges
function generateWeekData(min, max) {
  returnval = []
  dayIterator = new Date()
  indexstart = (dayIterator.getDate() - 7)
  indexend = dayIterator.getDate()

  for (let i = indexstart; i < indexend; i++) {
    dayit = new Date()
    dayit.setDate(i);

    returnval.push([dayit.toJSON(), generateRandom(min, max)])
  }
  return returnval;
}

//Generate sample historical data for each sensor
function SampleData() {
  if (generateSampleData === true) {

    //Temperature
    const maxTemp = 35;
    const minTemp = 0;

    sgDictExample.Temperature.Value = generateRandom(minTemp, maxTemp)
    sgDictExample.Temperature.History = generateWeekData(minTemp, maxTemp)

    //Light Intensity
    const maxLight = 100;
    const minLight = 0;

    sgDictExample.Light.Value = generateRandom(minLight, maxLight)
    sgDictExample.Light.History = generateWeekData(minLight, maxLight)

    //Soil Moisture
    const maxSoilMoisture = 100;
    const minSoilMoisture = 0;

    sgDictExample.SoilMoisture.Value = generateRandom(minSoilMoisture, maxSoilMoisture)
    sgDictExample.SoilMoisture.History = generateWeekData(minSoilMoisture, maxSoilMoisture)

    //Humidity
    const maxHumidity = 35;
    const minHumidity = 0;

    sgDictExample.Humidity.Value = generateRandom(minHumidity, maxHumidity)
    sgDictExample.Humidity.History = generateWeekData(minHumidity, maxHumidity)


    //Automations
    const name = "Automation Example 3"
    const hashValue = hash(name)
    sgDictExample.Automations[hashValue] = {
      Name: "Automation Example 3",
      Enabled: false,
      Type: "Soil Moisture",
      Value: 30,
      Time: "2024-04-18T21:45:00.000Z",
      DaySelected: {
        ["Monday"]: true,
        ["Tuesday"]: true,
        ["Wednesday"]: true,
        ["Thursday"]: true,
        ["Friday"]: true,
        ["Saturday"]: false,
        ["Sunday"]: false,
      },
      Id: hashValue,
      LastRan: null
    }
  }
}


//generateSampleData must be true!
SampleData()

useStore = create(
  persist(
    (set, get) => ({
      data: sgDictExample,

      CurrentSensorValue: (sensor) => { //This is for simulation purposes

        //Current sensor value is calculated via how much time has passed from when its been last changed
        //Eg. If transition time is 5 minutes then the current value reaches the target value 5 minutes or longer from the last time the user changed the target value
        if (sensor === "Light Intensity") {  //convert into dictionary compatible sensor names
          sensor = "Light";
        } else if (sensor === "Soil Moisture") {
          sensor = "SoilMoisture";
        }
        const transTime = 0.1; //mins // transition time to get to target value
        const transTimeMs = transTime * 60 * 1000;
        lastChangedDate = get().data[sensor].LastChanged; //date object
        if (typeof (lastChangedDate === "string")) { //deserialise dates to data object
          lastChangedDate = new Date(lastChangedDate);
        }


        if (lastChangedDate !== null) {
          nowDate = new Date();
          endDate = new Date(lastChangedDate.getTime() + transTimeMs) 

          elapsedTime = (new Date() - lastChangedDate)
          const percentage = (elapsedTime / transTimeMs)

          ActualValue = lerp(get().data[sensor].PrevValue, get().data[sensor].Value, clamp(percentage, 0, 1))


          ActualValue = parseInt(ActualValue.toFixed(0))

          return ActualValue;
        } else {
          return get().data[sensor].PrevValue;
        }
      },

      setTemperature: (newVal) => {
        set((state) => {

          return {
            data:
            {
              ...state.data,
              Temperature: {
                ...state.data.Temperature,
                Value: newVal,
                PrevValue: parseInt(get().data.Temperature.Value),
                LastChanged: new Date()
              }
            }
          }
        })
      },

      setLight: (newVal) => {
        set((state) => {
          return {
            data:
            {
              ...state.data,
              Light: {
                ...state.data.Light,
                Value: newVal,
                PrevValue: parseInt(get().data.Light.Value),
                LastChanged: new Date()
              }
            }
          }
        })
      },

      setSoilMoisture: (newVal) => {
        set((state) => {
          return {
            data:
            {
              ...state.data,
              SoilMoisture: {
                ...state.data.SoilMoisture,
                Value: newVal,
                PrevValue: parseInt(get().data.SoilMoisture.Value),
                LastChanged: new Date()
              }
            }
          }
        })
      },

      setHumidity: (newVal) => {
        set((state) => {
          return {
            data:
            {
              ...state.data,
              Humidity: {
                ...state.data.Humidity,
                Value: newVal,
                PrevValue: parseInt(get().data.Humidity.Value),
                LastChanged: new Date()
              }
            }
          }
        })
      },

      addTemperatureHistory: (newVal) => {
        newVal = parseInt(newVal)
        date = new Date()
        dateJSON = date.toJSON()
        const histData = [dateJSON, newVal]

        set((state) => ({
          data: {
            ...state.data,
            Temperature: {
              ...state.data.Temperature,
              History: state.data.Temperature.History.concat([histData])
            }
          },
        }))
      },

      addLightHistory: (newVal) => {
        newVal = parseInt(newVal)
        date = new Date()
        dateJSON = date.toJSON()
        const histData = [dateJSON, newVal]

        set((state) => ({
          data: {
            ...state.data,
            Light: {
              ...state.data.Light,
              History: state.data.Light.History.concat([histData])
            }
          },
        }))
      },

      addSoilMoistureHistory: (newVal) => {
        newVal = parseInt(newVal)
        date = new Date()
        dateJSON = date.toJSON()
        const histData = [dateJSON, newVal]

        set((state) => ({
          data: {
            ...state.data,
            SoilMoisture: {
              ...state.data.SoilMoisture,
              History: state.data.SoilMoisture.History.concat([histData])
            }
          },
        }))
      },

      addHumidityHistory: (newVal) => {
        newVal = parseInt(newVal)
        date = new Date()
        dateJSON = date.toJSON()
        const histData = [dateJSON, newVal]

        set((state) => ({
          data: {
            ...state.data,
            Humidity: {
              ...state.data.Humidity,
              History: state.data.Humidity.History.concat([histData])
            }
          },
        }))
      },

      getAutomationList: () => {
        return get().data.Automations
      },

      submitAutomation: (name, autoData) => { //add automation

        autoData = autoData[name]
        set((state) => {

          return {
            data:
            {
              ...state.data,
              Automations: {
                ...state.data.Automations,
                [hash(name)]: autoData
              }
            }
          }
        })
        console.log(get().data.Automations)
        console.log("Submitted Automation!")
      },

      toggleAutomation: (hashName, bool) => {
        set((state) => {
          return {
            data:
            {
              ...state.data,
              Automations: {
                ...state.data.Automations,
                [hashName]: {
                  ...state.data.Automations[hashName],
                  Enabled: bool
                }
              }
            }
          }
        })
        // console.log(get().data.Automations)
        // console.log("Automation list ^^^")
      },

      invokeAutomation: (hashName, type, value) => { //If automation matches time and day then this function is ran
        if (type === "Soil Moisture") type = "SoilMoisture";
        if (type === "Light Intensity") type = "Light";

        if (get().data[type].Value === value) {
          console.log("value matched")
          return;
        }
        set((state) => {

          return {
            data:
            {
              ...state.data,
              [type]: {
                ...state.data[type],
                Value: value,
                PrevValue: parseInt(get().data[type].Value),
                LastChanged: new Date(),
              }
            }
          }
        })

        set((state) => {
          return {
            data:
            {
              ...state.data,
              Automations: {
                ...state.data.Automations,
                [hashName]: {
                  ...state.data.Automations[hashName],
                  LastRan: new Date(),
                }
              }
            }
          }
        })
        console.log(get().data.Automations)
        console.log("Invoke automation")
      },


      deleteAutomation: (hashName) => {
        console.log("Deleting automation")
        set((state) => {
          delete state.data.Automations[hashName]
          return state;
        })
      },

      waterGarden: () => {
        //Garden can only be watered every 30 seconds (by default)

        LastWatered = get().data.LastWatered
        if (LastWatered !== null) {
          LastWatered = new Date(LastWatered)
          elapsedTime = new Date() - LastWatered.getTime()

          if (elapsedTime > 30000) { // If 30 seconds past since the last time its been watered
            set((state) => {

              return {
                data:
                {
                  ...state.data,
                  LastWatered: new Date()
                }
              }
            })
            return [true, "Watering.."]
          } else {
            return [false, "Garden already watering"]
          }
        } else {
          set((state) => {

            return {
              data:
              {
                ...state.data,
                LastWatered: new Date()
              }
            }
          })
          return [true, "Watering.."]
        }
      },
      toggleBlinds: () => {
        const BlindsOpen = get().data.BlindsOpen;
        set((state) => {

          return {
            data:
            {
              ...state.data,
              BlindsOpen: !BlindsOpen
            }
          }
        })
      },
    }),
    {
      name: 'smarten-storage-016', // storage name
      storage: createJSONStorage(() => AsyncStorage) //storage system
    },
  )
)


export default useStore;
