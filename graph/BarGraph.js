import React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class BarGraph extends React.Component {
    render() {
        return (

            <View style={styles.chart}>
                <Text style={{ alignSelf: 'center', color: 'white' }}>
                    {this.props.graphTitle}
                </Text>

                <BarChart
                    showBarTops={true}
                    showValuesOnTopOfBars={true}
                    data={this.props.data}
                    width={Dimensions.get('window').width - 20} // from react-native
                    height={220}
                    yAxisInterval={'3'}
                    //yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
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
        color: 'white',
        marginTop: 60,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
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
        marginBottom: 50,
        marginTop: 25,
    }

})

export default BarGraph