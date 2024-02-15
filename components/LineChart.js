import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const data2 = [
  {
    key: new Date('December 17, 1995'),
    value: 10
  },
  {
    key: new Date('December 16, 1997'),
    value: 10
  },
  {
    key: new Date('December 25, 2000'),
    value: 50
  },
  {
    key: new Date('December 29, 2002'),
    value: 20
  },
  {
    key: new Date('December 31, 2001'),
    value: 80
  }
]

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{ x: "date", x: "linear" }}
        >
          <VictoryAxis dependentAxis />
          {/* <VictoryAxis style={{ tickLabels: { angle: 0 } }} fixLabelOverlap={true}  /> */}
          {/* <VictoryAxis
            scale="time"
            standalone={false}
            // style={styles.axisYears}
            // tickValues={tickValues}
            tickFormat={date => date.toLocaleString('en-us', { month:'short' })}
        /> */}
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            scale={{ x: "time", y: "linear" }}
            interpolation="monotoneX"
            domain={{ //Use this to get a week's worth of data shown
              x: [new Date(2001, 1, 1), new Date(2015, 12, 30)],
            }}
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
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}
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



// const getSingleStockChart = (state, stockId) => {
//   return state.transactions.allIds.reduce((result, transId) => {
//     if (state.transactions.byId[transId].stockId == stockId)
//       result.push({
//         x: new Date(state.transactions.byId[transId].seedDate),
//         y: state.transactions.byId[transId].price
//       })
//     return result
//   }, [])
// }