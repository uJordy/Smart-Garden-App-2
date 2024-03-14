import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';


var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

GardenData = sgDictExample; // Overwrite saved data

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
    // console.log("hi!!!")
    // set((state) => ({ data: state.data.Temperature.History.push("history one") }))
    // set((oldState) => {
    //   newState = oldState.data;
    //   newState.Temperature.History.push(newVal)
    //   return { data: newState }
    // })
    date = new Date()
    dateJSON = date.toJSON()
    const histData = [dateJSON, newVal]
    // console.log(histData)
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