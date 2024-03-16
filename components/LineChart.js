import React, {Component} from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

import useStore from '../stores/garden'

// const options = { weekday: "long" };

//send historical data into here and convert json time into data object
// export default class LineChart extends Component {
export default function LineChart(){

  const gardata = useStore((state) => state.data)

  const tempHistory = gardata.Temperature.History;
  const parsedTempHistory = tempHistory.map((tempItem) => {
    return {date: new Date(tempItem[0]), value: tempItem[1]}
    // { date: new Date(1982, 1, 1), value: 125 }
  })

  console.log("-----------")
  // console.log(new Date(2024, 2, 16,12))
  // console.log(new Date().getDay())
  const lastWeekdaysIndex = () => {
    returnval = []
    dayIterator = new Date()
    indexstart = (dayIterator.getDate() -7 )
    indexend = dayIterator.getDate()

    // console.log("I ONE")
    // console.log(indexstart)
    // console.log("I TWO")
    // console.log(dayIterator.getDate())
    for (let i = indexstart; i < indexend; i++) {

      // var day = date.getDate() - 12;
      dayIterator.setDate(i);
      // console.log(i)
      returnval.push(dayIterator.getDay())
    }
    console.log("return value")
    console.log(returnval);
    return returnval;
  }
  console.log(parsedTempHistory)
  // console.log(lastWeekdaysIndex());
  // console.log(parsedTempHistory)

  // render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{ x: "date", y: "linear" }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis
            // tickFormat={(x) => new Date(x).getFullYear()}
            // tickValues={[0,1,2,3,4,5,6]}
            // tickValues={lastWeekdaysIndex()}
            tickValues={[
              new Date(2024, 2, 10),
              new Date(2024, 2, 11),
              new Date(2024, 2, 12),
              new Date(2024, 2, 13),
              new Date(2024, 2, 14),
              new Date(2024, 2, 15),
              new Date(2024, 2, 16),

            ]}
            // tickFormat={(x) => new Intl.DateTimeFormat("en-US", options).format(x)}
            // tickFormat={(x) => new Date(x).getDay()}

            tickFormat={(x) => x.toLocaleString("en-EN", {weekday: "short"})}

          />
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            scale={{ x: "time"}}
            interpolation="monotoneX"
            // domain={{ //Use this to get a week's worth of data shown
            //   x: [new Date(2001, 1, 1), new Date.now],
            // }}
            data={parsedTempHistory}
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


