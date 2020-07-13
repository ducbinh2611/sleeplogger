import React from 'react';
import LineGraph from '../graph/LineGraph';
import BarGraph from '../graph/BarGraph';
import PieChartGraph from '../graph/PieChartGraph';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MultiplePieChart from '../component/MultiplePieChart';

class DataPage extends React.Component {


    render() {
        const { sleepData, cafMorning, cafAfternoon, cafEvening, napMorning, napAfternoon, napEvening } = this.props
        return (
            <View style={styles.content}>
                <LineGraph
                    xAxisLabel={' hrs'}
                    graphTitle={'Sleeping hours'}
                    data={sleepData}
                />

                <BarGraph
                    graphTitle={'Morning Caffeine Intake'}
                    data={cafMorning}
                />

                <BarGraph
                    graphTitle={'Afternoon Caffeine Intake'}
                    data={cafAfternoon}
                />

                <BarGraph
                    graphTitle={'Evening Caffeine Intake'}
                    data={cafEvening}
                />


                {/* <View ></View>
                <LinearGradient style={styles.pieChartContainer} colors={['#fb8c00', '#ffa726']}>
                    <View style={styles.firstRowPie}>
                        <PieChartGraph graphTitle={'Morning'} />
                        <PieChartGraph graphTitle={'Afternoon'} />
                    </View>

                    <View style={styles.secondRowPie}>
                        <PieChartGraph  graphTitle={'Evening'}/>
                    </View>
                </LinearGradient> */}
                <MultiplePieChart 
                    graphTitle={'Nap Frequency'}
                    morningData={napMorning}
                    afternoonData={napAfternoon}
                    eveningData={napEvening}
                />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        marginTop: 50,
        
        alignSelf: 'center',
    },
    pieChartContainer: {
        
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
    }
})

export default DataPage