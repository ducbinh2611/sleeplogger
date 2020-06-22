import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import ChoiceButton from '../component/ChoiceButton';
import LinearGradient from 'react-native-linear-gradient';
import LineGraph from '../graph/LineGraph';
import BarGraph from '../graph/BarGraph';

const linedata = {
  labels: ['3.0', '3.5', '4.5', '5.0', '5.5'],
  datasets: [
    {
      data: [20, 14, 28, 18, 23],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadMorning = {
  labels: ['None', 'Low', 'Meidum', 'High'],
  datasets: [
    {
      data: [0, 4, 1, 2],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadAfternoon = {
  labels: ['None', 'Low', 'Meidum', 'High'],
  datasets: [
    {
      data: [0, 4, 12, 15],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadEvening = {
  labels: ['None', 'Low', 'Meidum', 'High'],
  datasets: [
    {
      data: [0, 4, 1, 25],
      strokeWidth: 2, // optional
    },
  ],
};

export default class DataScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }

  state = {
    sad: false,
    neutral: false,
    happy: false,
  }

  handleSadButton = () => {
    if (this.state.sad) {
      this.setState({
        sad: !this.state.sad
      })
    } else {
      this.setState({
        sad: !this.state.sad,
        neutral: false,
        happy: false,
      })
    }

  }

  handleNeutralButton = () => {
    if (this.state.neutral) {
      this.setState({
        neutral: !this.state.neutral
      })
    } else {
      this.setState({
        neutral: !this.state.neutral,
        sad: false,
        happy: false,
      })
    }

  }

  handleHappyButton = () => {
    if (this.state.happy) {
      this.setState({
        happy: !this.state.happy
      })
    } else {
      this.setState({
        happy: !this.state.happy,
        neutral: false,
        sad: false,
      })
    }

  }

  handleTipButton = () => {
    this.props.navigation.navigate('SavedTipScreen')
  }

  render() {
    const { sad, neutral, happy } = this.state
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
        <ScrollView>

          <View style={styles.container}>
            <TouchableOpacity onPress={this.handleTipButton}>
              <Text style={styles.goBackBut}> View your saved tips </Text>
            </TouchableOpacity>

            <Text style={styles.headerText}> View day with wake up feeling of </Text>
            <View style={styles.statusBar}>
              <ChoiceButton path={require('../images/sad.png')}
                onPress={this.handleSadButton}
                active={this.state.sad}> </ChoiceButton>
              <ChoiceButton path={require('../images/neutral_face.png')}
                onPress={this.handleNeutralButton}
                active={this.state.neutral}> </ChoiceButton>
              <ChoiceButton path={require('../images/happy_face.png')}
                onPress={this.handleHappyButton}
                active={this.state.happy}> </ChoiceButton>
            </View>

            {
              sad &&
              <View style={styles.content}>
                <LineGraph
                  graphTitle={'Sleeping hours'}
                  data={linedata}
                />

                <BarGraph
                  graphTitle={'Morning Caffeine Intake'}
                  data={cafSadMorning}
                />

                <BarGraph
                  graphTitle={'Afternoon Caffeine Intake'}
                  data={cafSadAfternoon}
                />

                <BarGraph
                  graphTitle={'Evening Caffeine Intake'}
                  data={cafSadEvening}
                />

              </View>


            }

            {
              neutral && <View style={styles.content}>
                <Text> neutral </Text>
              </View>
            }

            {
              happy && <View style={styles.content}>
                <Text> happy </Text>
              </View>
            }

          </View>

        </ScrollView>
      </LinearGradient>
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
    marginBottom: 50,
    alignSelf: 'center'
  },
  savedTips: {
    marginTop: 20,
    color: 'black',
  },
  chart: {
    marginBottom: 50,
    marginTop: 25,
  },
  goBackBut: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  }

})

{/* <View>
        <Text>
          Bezier Line Chart
            </Text>
        <LineChart
          data={linedata}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisLabel={'$'}
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
      </View> */}