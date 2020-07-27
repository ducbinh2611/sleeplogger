import React from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';


class LineGraph extends React.Component {
  // function to find the largest data point
  findLargestData = (data) => {
    const arr = data.datasets[0].data
    var largestSoFar = 0
    for (i = 0; i < arr.length; i++) {
      if (arr[i] > largestSoFar) {
        largestSoFar = arr[i]
      }
    }
    return largestSoFar
  }

  //function to return the number of segment
  findSegment = (data) => {
    const largest = this.findLargestData(data)
    const segmentArr = [1, 1, 2, 3, 4, 5, 3, 7, 4, 3, 5]
    if (largest <= 10) {
      return segmentArr[largest % 11]
    } else {
      return 4
    }
  }

  render() {
    return (

      <View style={styles.chart}>
        <Text style={styles.headerText}>
          {this.props.graphTitle}
        </Text>

        <LineChart
          segments={this.findSegment(this.props.data)}
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
            decimalPlaces: 1, // optional, defaults to 2dp
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