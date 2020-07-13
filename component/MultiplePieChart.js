import React from 'react';
import PieChartGraph from '../graph/PieChartGraph';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class MultiplePieChart extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                
                <Text style={styles.headerText}>
                    {this.props.graphTitle}
                </Text>

                <LinearGradient style={styles.pieChartContainer} colors={['#fb8c00', '#ffa726']}>
                    <View style={styles.firstRowPie}>
                        <PieChartGraph graphTitle={'Morning'} data={this.props.morningData} /> 
                        {/* add props data here  */}
                        <PieChartGraph graphTitle={'Afternoon'} data={this.props.afternoonData}/>
                    </View>

                    <View style={styles.secondRowPie}>
                        <PieChartGraph graphTitle={'Evening'} data={this.props.eveningData} />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: -50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 130,
    },
    pieChartContainer: {
        marginTop: 10,
        borderRadius: 30,
        marginBottom: 50,
    },
    firstRowPie: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    secondRowPie: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    headerText: {
        alignSelf: 'center', 
        color: 'white',
        fontWeight: 'bold',
    },
})

export default MultiplePieChart