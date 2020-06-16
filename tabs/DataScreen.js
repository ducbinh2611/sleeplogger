import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
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


const linedata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
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
    this.setState({
      sad: !this.state.sad
    })
  }

  handleNeutralButton = () => {
    this.setState({
      neutral: !this.state.neutral
    })
  }

  handleHappyButton = () => {
    this.setState({
      happy: !this.state.happy
    })
  }

  handleTipButton = () => {
      this.props.navigation.navigate('SavedTipScreen')
  }

  render() {
    const { sad, neutral, happy } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button title='View saved tips' 
                    onPress={this.handleTipButton}/>
          <Text style={styles.headerText}> View day with wake up feeling of </Text>
          <View style={styles.statusBar}>
            <ChoiceButton path={require('../images/sad.png')}
              onPress={this.handleSadButton}> </ChoiceButton>
            <ChoiceButton path={require('../images/neutral_face.png')}
              onPress={this.handleNeutralButton}> </ChoiceButton>
            <ChoiceButton path={require('../images/happy_face.png')}
              onPress={this.handleHappyButton}> </ChoiceButton>
          </View>

          {
            sad && <View style={styles.content}>
              <View>
                <Text style={{alignSelf:'center'}}>
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
              </View>
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