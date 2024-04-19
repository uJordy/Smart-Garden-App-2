import * as FileSystem from 'expo-file-system';
import hash from 'hash-it';

var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

generateSampleData = true;

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

    // [hash("Automation Example 3")] = {
    //   Name: "Automation Example 3",
    //   Enabled: false,
    //   Type: "Soil Moisture",
    //   Value: 30,
    //   Time: "2020-08-22T01:15:30.000Z",
    //   DaySelected: {
    //     ["Monday"]: true,
    //     ["Tuesday"]: true,
    //     ["Wednesday"]: true,
    //     ["Thursday"]: true,
    //     ["Friday"]: true,
    //     ["Saturday"]: false,
    //     ["Sunday"]: false,
    //   }
  }
}


GardenData = sgDictExample; // Overwrite saved data

function generateRandom(min, max) {
  let difference = max - min;

  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
}

//Returns last week data for each sensor within min and max ranges
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


function SampleData() {
  if (generateSampleData === true) {

    //Temperature
    const maxTemp = 35;
    const minTemp = 0;

    GardenData.Temperature.Value = generateRandom(minTemp, maxTemp)
    GardenData.Temperature.History = generateWeekData(minTemp, maxTemp)

    //Light Intensity
    const maxLight = 100;
    const minLight = 0;

    GardenData.Light.Value = generateRandom(minLight, maxLight)
    GardenData.Light.History = generateWeekData(minLight, maxLight)

    //Soil Moisture
    const maxSoilMoisture = 100;
    const minSoilMoisture = 0;

    GardenData.SoilMoisture.Value = generateRandom(minSoilMoisture, maxSoilMoisture)
    GardenData.SoilMoisture.History = generateWeekData(minSoilMoisture, maxSoilMoisture)

    //Humidity
    const maxHumidity = 35;
    const minHumidity = 0;

    GardenData.Humidity.Value = generateRandom(minHumidity, maxHumidity)
    GardenData.Humidity.History = generateWeekData(minHumidity, maxHumidity)


    //Automations

    // sgDictExample.Automations[hash("Automation Example")] = {
    //   Name: "Automation Example",
    //   Enabled: true,
    //   Type: "Humidity",
    //   Value: 30,
    //   Time: "2020-08-22T15:15:30.000Z",
    //   DaySelected: {
    //     ["Monday"]: true,
    //     ["Tuesday"]: false,
    //     ["Wednesday"]: false,
    //     ["Thursday"]: true,
    //     ["Friday"]: false,
    //     ["Saturday"]: false,
    //     ["Sunday"]: false,
    //   }
    // }

    // sgDictExample.Automations[hash("Automation Example 2")] = {
    //   Name: "Automation Example 2",
    //   Enabled: false,
    //   Type: "Temperature",
    //   Value: 30,
    //   Time: "2020-08-22T01:15:30.000Z",
    //   DaySelected: {
    //     ["Monday"]: false,
    //     ["Tuesday"]: false,
    //     ["Wednesday"]: false,
    //     ["Thursday"]: false,
    //     ["Friday"]: false,
    //     ["Saturday"]: true,
    //     ["Sunday"]: true,
    //   }
    // }
    sgDictExample.Automations[hash("Automation Example 3")] = {
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
      }
    }
    // sgDictExample.Automations[hash("Automation Example 4")] = {
    //   Name: "Automation Example 4",
    //   Enabled: true,
    //   Type: "Humidity",
    //   Value: 30,
    //   Time: "2020-08-22T05:19:30.000Z",
    //   DaySelected: {
    //     ["Monday"]: false,
    //     ["Tuesday"]: false,
    //     ["Wednesday"]: false,
    //     ["Thursday"]: false,
    //     ["Friday"]: false,
    //     ["Saturday"]: true,
    //     ["Sunday"]: true,
    //   }
    // }
  }
}

DBHandler = {

  getData: () => {
    return GardenData;
  },

  saveData: () => {
    const id = FileSystem.documentDirectory + fileName;

    FileSystem.getInfoAsync(id).then(file => {
      if (file.exists) {
        // Ensures garden data can't save null data
        if (GardenData.Temperature != null &&
          GardenData.Light != null &&
          GardenData.SoilMoisture != null &&
          GardenData.Humidity != null &&
          GardenData.Automations != null
        ) {
          const updatedPayload = sgDictExample;

          FileSystem.writeAsStringAsync(id, JSON.stringify(updatedPayload)).then(success => {
            console.log("Successfully saved!")
          })
        }

      } else {
        console.warn("File Not Found, creating new..")
        GardenData = sgDictExample
      }
    })
  },

  loadData: async () => {
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
          GardenData = sgDictExample
          SampleData()
          // return sgDictExample
        }
      }).catch((error) => {
        console.error(error);
      })
    }



    // file = await FileSystem.getInfoAsync(id)
    // if (file.exists) {
    //   payloadJson = await FileSystem.readAsStringAsync(id)
    //   const payload = JSON.parse(payloadJson)
    //   console.log(payload);

    //   // GardenData = payload;
    //   // const SetDBData = useStore((state) => state.SetDBData)
    //   console.log("Successfully loaded")
    //   return payload
    //   // SetDBData(payload)
    //   // console.log("Successfully loaded")
    //   // })
    // } else {
    //   console.warn("File Not Found, creating new..")
    //   // createFile()
    //   console.log(sgDictExample)
    //   return sgDictExample
    // }
    // // }).catch((error) => {
    // //   console.error(error);
    // // })
  // }
}

DBHandler.loadData()

export default DBHandler;