import React from 'react';
import {
    BarChart,
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class BarGraph extends React.Component {

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

                <BarChart
                    segments={this.findSegment(this.props.data)}
                    data={this.props.data}
                    showBarTops={true}
                    showValuesOnTopOfBars={true}
                    width={Dimensions.get('window').width - 20} // from react-native
                    height={220}
                    yAxisInterval={'1'}
                    chartConfig={{
                        showValuesOnTopOfBars: true,
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#5B7E6C',
                        backgroundGradientTo: '#71A289',
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}

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
    headerText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    chart: {
        marginBottom: 20,
        marginTop: 25,
    },

})

export default BarGraph