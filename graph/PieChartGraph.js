import React from 'react';
import {
    PieChart,
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const data = [
    {
      name: "Yes",
      population: 20,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "white",
      legendFontSize: 15
    },
    {
      name: "No",
      population: 70,
      color: "#F00",
      legendFontColor: "white",
      legendFontSize: 15
    },
  ];

class PieChartGraph extends React.Component {
    render() {
        return (
            <View style={styles.chart}>
                <Text style={styles.headerText}>
                    {this.props.graphTitle}
                </Text>

                <PieChart
                    data={this.props.data} // change here to this.props.data
                    width={Dimensions.get('window').width / 2 - 10}
                    height={100}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    //paddingLeft="15"
                    //paddingRight="15"
                    absolute
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
    },

})

export default PieChartGraph