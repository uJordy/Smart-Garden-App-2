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
    <View style={styles.container} className="bg-slate-800">
      <VictoryChart
      className="bg-slate-800"
        theme={VictoryTheme.material}
        scale={{ x: "date", y: "linear" }}
        domainPadding={{ y: 10 }}
        // fill="#0f172a"

        style={{
          data: { fill: "tomato"}
          // labels: { fontSize: 30 },
          // parent: { border: "1px solid #ccc" }
        }}
        
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis
          tickValues={lastWeekdaysIndex()}
          tickFormat={(x) => x.toLocaleString("en-EN", { weekday: "short" })}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc", fill:"green" }
          }}
          scale={{ x: "time" }}
          interpolation="monotoneX"
          domain={{ //Use this to get a week's worth of data shown
            x: [lastWeekdaysIndex()[0], lastWeekdaysIndex()[6]],
          }}
          data={parsedHistory}
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
    fill:"#1e293b",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});


