import React from 'react';
import {
    BarChart,
} from 'react-native-chart-kit';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class BarGraph extends React.Component {
    render() {
        return (

            <View style={styles.chart}>
                <Text style={styles.headerText}>
                    {this.props.graphTitle}
                </Text>

                <BarChart
                    
                    data={this.props.data}
                    showBarTops={true}
                    showValuesOnTopOfBars={true}
                    width={Dimensions.get('window').width - 20} // from react-native
                    height={220}
                    yAxisInterval={'1'}
                    
                    
                    chartConfig={{
                        showValuesOnTopOfBars: true,
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0, // optional, defaults to 2dp
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