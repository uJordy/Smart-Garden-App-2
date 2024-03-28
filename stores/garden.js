import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';


var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

GardenData = sgDictExample; // Overwrite saved data
const generateSampleData = true;

var sgDictExample = {
  Temperature: { //Celcius 
    Value: 0, //Current
    History: []
  },
  Light: { //Percentage
    Value: 0,
    History: []
  },
  SoilMoisture: { //Percentage
    Value: 0,
    History: []
  },
  Humidity: { //Percentage
    Value: 0,
    History: []
  },
}

function generateRandom(min, max) {
  let difference = max - min;

  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = rand + min;

  return rand;
}

//Returns last week data for each sensor within min and max ranges
function generateWeekData(min, max) { 
  returnval = []
  dayIterator = new Date()
  indexstart = (dayIterator.getDate() -7 )
  indexend = dayIterator.getDate()

  for (let i = indexstart; i < indexend; i++) {
    dayit = new Date()
    dayit.setDate(i);

    returnval.push([dayit.toJSON(), generateRandom(min, max)])
  }
  return returnval;
}

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


  }
}

function createFile() {
  GardenData = sgDictExample;
}

function saveData() {
  const id = FileSystem.documentDirectory + fileName;

  FileSystem.getInfoAsync(id).then(file => {
    if (file.exists) {
      // Ensures garden data can't save null data
      if (GardenData.Temperature != null &&
        GardenData.Light != null &&
        GardenData.SoilMoisture != null &&
        GardenData.Humidity != null
      ) {
        const updatedPayload = sgDictExample;

        FileSystem.writeAsStringAsync(id, JSON.stringify(updatedPayload)).then(success => {
          console.log("Successfully saved!")
        })
      }

    } else {
      console.warn("File Not Found, creating new..")
      createFile()
    }
  })
}

function loadData() {
  const id = FileSystem.documentDirectory + fileName;

  FileSystem.getInfoAsync(id).then(file => {
    if (file.exists) {
      FileSystem.readAsStringAsync(id).then(payloadJson => {
        const payload = JSON.parse(payloadJson)
        console.log(payload);
        GardenData = payload;
        console.log("Successfully loaded")
      })
    } else {
      console.warn("File Not Found, creating new..")
      createFile()
    }
  }).catch((error) => {
    console.error(error);
  })
}

function addHistoryData(sensor, data) {
  if (typeof (data) === "string") {
    GardenData[sensor].History.append(data)
    console.log("Successfully appended historical data for " + sensor)
  } else {
    console.error("History Data: Invalid data type")
  }
}

//generateSampleData must be true!
SampleData()

const useStore = create((set, get) => ({
  data: sgDictExample,

  // Temperature: () => data.Temperature.Value,

  setTemperature: (newVal) => {
    set((state) => ({
      // newState = oldState.data;
      // newState.Temperature.Value = newVal
      // return { data: newState }
      data: { ...state.data, Temperature: { ...state.data.Temperature, Value: newVal } },
    }))
  },

  setLight: (newVal) => {
    set(() => {
      newState = oldState.data;
      newState.Light.Value = newVal
      return { data: newState }
    })
  },

  setSoilMoisture: (newVal) => {
    set(() => {
      newState = oldState.data;
      newState.SoilMoisture.Value = newVal
      return { data: newState }
    })
  },

  setHumidity: (newVal) => {
    set(() => {
      newState = oldState.data;
      newState.Humidity.Value = newVal
      return { data: newState }
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
    set((oldState) => {
      newState = oldState.data;
      newState.Light.History.push(newVal)
      return { data: newState }
    })
  },

  addSoilMoistureHistory: (newVal) => {
    set((oldState) => {
      newState = oldState.data;
      newState.SoilMoisture.History.push(newVal)
      return { data: newState }
    })
  },

  addLightHistory: (newVal) => {
    set((oldState) => {
      newState = oldState.data;
      newState.Light.Light.push(newVal)
      return { data: newState }
    })
  },
}))



// const userStore = create<Store>((set, get) => ({
//   ...
//   setFavoriteMovie: (id: number) => {
//      set((state) => ({
//        user: {
//          ...state.user,
//          favoriteMovies: [...state.user.favoriteMovies, id]
//        }
//      }))
//    },
//  }));

// const addHistory = useStore((state) => state.addHistory)
// return <button onClick={increasePopulation}>one up</button>

export default useStore;