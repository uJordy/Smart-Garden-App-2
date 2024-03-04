import React, {Component} from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

//send historical data into here and convert json time into data object
export default class LineChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{ x: "date", x: "linear" }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}
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
            data={[
              { date: new Date(1982, 1, 1), value: 125 },
              { date: new Date(1987, 1, 1), value: 257 },
              { date: new Date(1993, 1, 1), value: 345 },
              { date: new Date(1997, 1, 1), value: 515 },
              { date: new Date(2001, 1, 1), value: 132 },
              { date: new Date(2005, 1, 1), value: 305 },
              { date: new Date(2011, 1, 1), value: 270 },
              { date: new Date(2015, 1, 1), value: 470 }
            ]}
            x="date"
            y="value"
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});


