import * as FileSystem from 'expo-file-system';

// var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

// var sgDictExample = {
//   Temperature: 50, //Celcius 
//   Light: 20, //Percentage
//   SoilMoisture: 5, //Percentage
//   Humidity: 80 //Percentage
// }

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

// GardenData = sgDictExample;


class DataHandler {

  GardenData = {};
  GardenData = sgDictExample; // Overwrite saved data

  get GardenData() {
    return this.GardenData;
  }

  // Must loadData() first!

  createFile() {
    GardenData = sgDictExample;
  }

  saveData() {
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

  loadData() {
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


  async update(id, updates) {
    id = FileSystem.documentDirectory + 'GardenDictionary.json'
    updates = { first: "added new content!" };
    try {
      console.log("checking if file exists")

      FileSystem.getInfoAsync(id).then(file => {
        if (file.exists) {
          console.log("file exists")

          FileSystem.readAsStringAsync(id).then(payloadJson => {
            // console.log(tmp)
            const payload = JSON.parse(payloadJson)
            console.log(payload)
          })
        }
        else {
          console.error("no FILE found, creating")
          FileSystem.writeAsStringAsync(id, JSON.stringify(updates))
        }
      }).catch((error) => {
        console.error(error);
      });
    } catch (e) {
      console.error(e)
    }
  }

  addHistoryData(sensor, data) {
    if (typeof(data) === "string"){
      GardenData[sensor].History.append(data)
      console.log("Successfully appended historical data for " + sensor)
    } else {
      console.error("History Data: Invalid data type")
    }
  }
}

export default DataHandler;