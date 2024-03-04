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
  if (typeof(data) === "string"){
    GardenData[sensor].History.append(data)
    console.log("Successfully appended historical data for " + sensor)
  } else {
    console.error("History Data: Invalid data type")
  }
}

const useStore = create((set) => ({
  data: sgDictExample,
  addHistory: () => {
    console.log("hi!!!")
    // set((state) => ({ data: state.data.Temperature.History.push("history one") }))

    set((oldState) => {
      console.log("Func 1")
      console.log(oldState.data);
      newState = oldState.data;
      newState.Temperature.History.push("history one")
      return {  data: newState }
    })
  },

  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
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
console.log("history work?")
// return <button onClick={increasePopulation}>one up</button>

export default useStore