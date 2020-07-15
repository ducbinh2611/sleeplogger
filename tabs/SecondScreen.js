import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StackNavigator } from 'react-navigation';
import TipScreen from './TipScreen';
import SavedTipScreen from './SavedTipScreen';



export default class SecondScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name={'like2'} color={tintColor} size={20} />
    ),
    header: () => null
}

  render() {
    return (
      <TipStack  />
    )
  }
}

const TipStack = StackNavigator({
  TipScreen: {
    screen: TipScreen,
  },
  SavedTipScreen: {
    screen: SavedTipScreen
  },
});

