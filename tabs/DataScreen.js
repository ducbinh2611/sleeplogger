import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import ChoiceButton from '../component/ChoiceButton';
import LinearGradient from 'react-native-linear-gradient';
import DataPage from '../DataPage/DataPage';
import LoadingSign from '../component/LoadingSign';
import AsyncStorage from '@react-native-community/async-storage';

const linedata = {
  labels: ['3.0', '3.5', '4.5', '5.0', '5.5'],
  datasets: [
    {
      data: [20, 14, 28, 18, 23],
      strokeWidth: 2, // optional
    },
  ],
};

const sleepNeut = {
  labels: ['5.5', '6.5', '7.0', '7.5', '8.0'],
  datasets: [
    {
      data: [10, 24, 8, 10, 12],
      strokeWidth: 2, // optional
    },
  ],
};

const sleepHappy = {
  labels: ['6.5', '7.5', '8.0', '8.5', '9.0'],
  datasets: [
    {
      data: [10, 4, 20, 0, 12],
      strokeWidth: 2, // optional
    },
  ],
};

const cafNeutMorning = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [0, 0, 10, 8],
      strokeWidth: 2, // optional
    },
  ],
};

const cafNeutAfternoon = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [18, 0, 0, 0],
      strokeWidth: 2, // optional
    },
  ],
};

const cafNeutEvening = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [10, 0, 8, 0],
      strokeWidth: 2, // optional
    },
  ],
};

const cafHappyMorning = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [0, 0, 8, 10],
      strokeWidth: 2, // optional
    },
  ],
};

const cafHappyAfternoon = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [10, 8, 0, 0],
      strokeWidth: 2, // optional
    },
  ],
};

const cafHappyEvening = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [18, 0, 0, 0],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadMorning = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [0, 4, 1, 2],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadAfternoon = {
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [0, 4, 12, 15],
      strokeWidth: 2, // optional
    },
  ],
};

const cafSadEvening = {
  labels: ['None', 'Low', 'Medium', 'High'],
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
    isLoading: false,
    emptyData: false,
    sad: false,
    neutral: false,
    happy: false,
    sleepData: {},
    cafAfternoon: {},
    cafMorning: {},
    cafEvening: {
      // labels: [],
      // datasets: [
      //   {
      //     data: [],
      //     strokeWidth: 2, // optional
      //   },
      // ],
    },
    napMorning: [],
    napAfternoon: [],
    napEvening: [],
  }

  handleSadButton = () => {
    this.setState({
      isLoading: true,
    })
    if (this.state.sad) {
      this.setState({
        sad: !this.state.sad
      })
    } else {
      this.getSleepHour(1)
      this.setState({
        sad: !this.state.sad,
        neutral: false,
        happy: false,
      })
    }

  }

  handleNeutralButton = () => {
    this.setState({
      isLoading: true,
    })
    if (this.state.neutral) {
      this.setState({
        neutral: !this.state.neutral
      })
    } else {
      this.getSleepHour(2)
      this.setState({
        neutral: !this.state.neutral,
        sad: false,
        happy: false,
      })
    }

  }

  handleHappyButton = () => {
    this.setState({
      isLoading: true,
    })
    if (this.state.happy) {
      this.setState({
        happy: !this.state.happy
      })
    } else {
      this.getSleepHour(3)
      this.setState({
        happy: !this.state.happy,
        neutral: false,
        sad: false,
      })
    }

  }

  sleepHourComparator = (sleep1, sleep2) => {
    return sleep1.hours - sleep2.hours
  }

  sleepHourSort = (array) => {
    return array.sort(this.sleepHourComparator)
  }

  sleepDataGen = (array) => {
    const sleep = {
      labels: [],
      datasets: [
        {
          data: [],
          strokeWidth: 2, // optional
        }
      ]
    }
    for (i = 0; i < array.length; i++) {
      sleep.labels[i] = array[i].hours
      sleep.datasets[0].data[i] = array[i].count
    }

    return sleep
  }

  cafAfternoonDataGen = (array) => {
    const data = {
      labels: ['None', 'Low', 'Medium', 'High'],
      datasets: [
        {
          data: [0, 0, 0, 0],
          strokeWidth: 2, // optional
        }
      ]
    }
    for (i = 0; i < array.length; i++) {

      data.datasets[0].data[array[i].caffeine_afternoon] = array[i].count
    }

    return data
  }

  cafMorningDataGen = (array) => {
    const data = {
      labels: ['None', 'Low', 'Medium', 'High'],
      datasets: [
        {
          data: [0, 0, 0, 0],
          strokeWidth: 2, // optional
        }
      ]
    }
    for (i = 0; i < array.length; i++) {

      data.datasets[0].data[array[i].caffeine_morning] = array[i].count
    }

    return data
  }

  cafEveningDataGen = (array) => {
    const data = {
      labels: ['None', 'Low', 'Medium', 'High'],
      datasets: [
        {
          data: [0, 0, 0, 0],
          strokeWidth: 2, // optional
        }
      ]
    }
    for (i = 0; i < array.length; i++) {
      data.datasets[0].data[array[i].caffeine_evening] = array[i].count
    }
    return data
  }

  napMorningDataGen = (array) => {
    const data = [
      {
        name: "Yes",
        population: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "white",
        legendFontSize: 15
      },
      {
        name: "No",
        population: 0,
        color: "#F00",
        legendFontColor: "white",
        legendFontSize: 15
      },
    ]
    for (i = 0; i < array.length; i++) {
      if (array[i].nap_morning) {
        data[0].population = array[i].count
      } else {
        data[1].population = array[i].count
      }
    }
    return data
  }

  napAfternoonDataGen = (array) => {
    const data = [
      {
        name: "Yes",
        population: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "white",
        legendFontSize: 15
      },
      {
        name: "No",
        population: 0,
        color: "#F00",
        legendFontColor: "white",
        legendFontSize: 15
      },
    ]
    for (i = 0; i < array.length; i++) {
      if (array[i].nap_afternoon) {
        data[0].population = array[i].count
      } else {
        data[1].population = array[i].count
      }
    }
    return data
  }

  napEveningDataGen = (array) => {
    const data = [
      {
        name: "Yes",
        population: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "white",
        legendFontSize: 15
      },
      {
        name: "No",
        population: 0,
        color: "#F00",
        legendFontColor: "white",
        legendFontSize: 15
      },
    ]
    for (i = 0; i < array.length; i++) {
      if (array[i].nap_evening) {
        data[0].population = array[i].count
      } else {
        data[1].population = array[i].count
      }
    }
    return data
  }


  getSleepHour = (sleepQual) => {
    AsyncStorage.getItem('token').then(token => {
      fetch('http://sleep-logger-dev.herokuapp.com/v1/graphing?morning_feeling=' + sleepQual.toString(), {
        method: 'GET',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token,
        }

      })
        .then(res => res.json())
        .then(res => {
          const dataArray = [res.hours, res.caffeine_morning, res.caffeine_afternoon, res.caffeine_evening,
                              res.nap_morning, res.nap_afternoon, res.nap_evening]
          dataArray[0] = this.sleepHourSort(res.hours)
          console.warn(res)
          return dataArray
        })
        .then(dataArray => {
          dataArray[0] = this.sleepDataGen(dataArray[0])
          dataArray[1] = this.cafMorningDataGen(dataArray[1])
          dataArray[2] = this.cafAfternoonDataGen(dataArray[2])
          dataArray[3] = this.cafEveningDataGen(dataArray[3])
          dataArray[4] = this.napMorningDataGen(dataArray[4])
          dataArray[5] = this.napAfternoonDataGen(dataArray[5])
          dataArray[6] = this.napEveningDataGen(dataArray[6])
          return dataArray
        })
        .then(res => {
          if (res[0].labels.length === 0) {
            this.setState({
              emptyData: true,
            })
          } else {
            this.setState({
              emptyData: false,
              sleepData: res[0],
              cafMorning: res[1],
              cafAfternoon: res[2],
              cafEvening: res[3],
              napMorning: res[4],
              napAfternoon: res[5],
              napEvening: res[6],
            })
          }
          this.setState({
            isLoading: false,
          })
        })
        .catch(err => console.error(err))
    })
  }

  handleTipButton = () => {
    this.props.navigation.navigate('SavedTipScreen')
  }

  handleLogOutButton = () => {
    AsyncStorage.removeItem("token")
      .then(res => {
        console.warn(this.props.navigation.popToTop())
        this.props.navigation.popToTop()
      })
  }

  render() {
    const { sad, neutral, happy, isLoading, emptyData, sleepData, cafMorning, cafEvening, cafAfternoon,
            napMorning, napAfternoon, napEvening } = this.state
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
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

            {(sad || neutral || happy) && isLoading &&
              <View style={{ position: 'absolute', top: height / 2, left: width / 2 - 20 }}>
                <LoadingSign />
              </View>
            }

            {(sad || neutral || happy) && !isLoading && emptyData &&
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Opps! There is no available data
                </Text>
              </View>

            }
            {
              sad && !isLoading && !emptyData &&
              <DataPage
                sleepData={sleepData}
                cafMorning={cafMorning}
                cafAfternoon={cafAfternoon}
                cafEvening={cafEvening}
                napMorning={napMorning}
                napAfternoon={napAfternoon}
                napEvening={napEvening}
              />
            }



            {
              neutral && !isLoading && !emptyData &&
              <DataPage
                sleepData={sleepData}
                cafMorning={cafMorning}
                cafAfternoon={cafAfternoon}
                cafEvening={cafEvening}
                napMorning={napMorning}
                napAfternoon={napAfternoon}
                napEvening={napEvening}
              />
            }

            {
              happy && !isLoading && !emptyData &&
              <DataPage
                sleepData={sleepData}
                cafMorning={cafMorning}
                cafAfternoon={cafAfternoon}
                cafEvening={cafEvening}
                napMorning={napMorning}
                napAfternoon={napAfternoon}
                napEvening={napEvening}
              />
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
    borderColor: 'black',
  },
  content: {
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  emptyText: {
    fontSize: 16,
    color: 'white',
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