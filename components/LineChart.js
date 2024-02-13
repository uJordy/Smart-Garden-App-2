import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
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