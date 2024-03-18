import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

import useStore from '../stores/garden'

// const options = { weekday: "long" };

//send historical data into here and convert json time into data object
// export default class LineChart extends Component {
export default function LineChart({ type }) {

  const gardata = useStore((state) => state.data)
  let sHistory = null

  if (type === "Temperature") { //define the scope where it will get its history
    sHistory = gardata.Temperature.History;
  } else if (type === "Light Intensity") {
    sHistory = gardata.Light.History;
  } else if (type === "Soil Moisture") {
    sHistory = gardata.SoilMoisture.History;
  } else if (type === "Humidity") {
    sHistory = gardata.Humidity.History;
  }
  const parsedHistory = sHistory.map((item) => {
    return { date: new Date(item[0]), value: item[1] }
  })

  dayIterator = new Date()
  lastw = (dayIterator.getDate() - 7)

  const lastWeekDate = new Date().setDate(lastw)
  const nowDate = new Date


  const lastWeekdaysIndex = () => { //Returns last week's days in date object
    returnval = []

    // new Date().setDate((new Date().getDate() -7))
    dayIterator = new Date()
    indexstart = (dayIterator.getDate() - 7)
    indexend = dayIterator.getDate()

    for (let i = indexstart; i < indexend; i++) {
      dayit = new Date()
      dayit.setDate(i); //set date from 7 days ago and iterate forwards
      returnval.push(dayit)
    }
    return returnval;
  }
  console.log(parsedHistory)

  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        scale={{ x: "date", y: "linear" }}
        domainPadding={{ y: 10 }}
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis
          // tickFormat={(x) => new Date(x).getFullYear()}
          // tickValues={[0,1,2,3,4,5,6]}
          tickValues={lastWeekdaysIndex()}
          // tickValues={[
          //   new Date(2024, 2, 10),
          //   new Date(2024, 2, 11),
          //   new Date(2024, 2, 12),
          //   new Date(2024, 2, 13),
          //   new Date(2024, 2, 14),
          //   new Date(2024, 2, 15),
          //   new Date(2024, 2, 16),

          // ]}
          // tickFormat={(x) => new Intl.DateTimeFormat("en-US", options).format(x)}
          // tickFormat={(x) => new Date(x).getDay()}

          tickFormat={(x) => x.toLocaleString("en-EN", { weekday: "short" })}

        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          scale={{ x: "time" }}
          interpolation="monotoneX"
          domain={{ //Use this to get a week's worth of data shown
            x: [lastWeekdaysIndex()[0], lastWeekdaysIndex()[6]],
          }}
          data={parsedHistory}
          // data={[
          //   { date: new Date(2024, 2, 16), value: 250 },
          //   { date: new Date(2024, 2, 15), value: 200 },
          //   { date: new Date(2024, 2, 14), value: 130 },
          //   { date: new Date(2024, 2, 13), value: 100 },
          //   { date: new Date(2024, 2, 12), value: 90 },
          //   { date: new Date(2024, 2, 11), value: 80 },
          //   { date: new Date(2024, 2, 10), value: 100 }
          // ]}
          x="date"
          y="value"
        />
      </VictoryChart>
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});


