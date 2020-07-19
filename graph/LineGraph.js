import React from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';


class LineGraph extends React.Component {
  render() {
    return (

      <View style={styles.chart}>
        <Text style={styles.headerText}>
          {this.props.graphTitle}
        </Text>

        <LineChart
          fromZero={true}
          yAxisLabel={this.props.yAxisLabel}
          xAxisLabel={this.props.xAxisLabel}
          data={this.props.data}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          xAxisLabel={this.props.xAxisLabel}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#141e30',
            backgroundGradientTo: '#243b55',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>


    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  image: {
    width: 22,
    height: 22,
    color: 'white',
  },
  headerText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  statusBar: {
    marginLeft: 100,
    marginTop: 15,
    flexDirection: 'row',
    borderRadius: 20,
    width: 100,
    height: 30,
    //padding: 10,
    borderColor: 'black',
  },
  content: {
    marginTop: 50,
    alignSelf: 'center'
  },
  savedTips: {
    marginTop: 20,
    color: 'black',
  },
  chart: {
    marginBottom: 20,
    marginTop: 25,
  }

})

export default LineGraph