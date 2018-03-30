import * as React from 'react'
import { View } from 'react-native'
import { RkStyleSheet } from 'react-native-ui-kitten'
import { GradientButton, PaginationIndicator } from '../../components/'
import { Walkthrough } from '../../components/Walkthrough'
import { Walkthrough1 } from './Walkthrough1'
import { Walkthrough2 } from './Walkthrough2'

interface WalkthroughScreenProps {
  navigation: any;
}

interface WalkthroughScreenState {
  index: number;
}

export class WalkthroughScreen extends React.Component<WalkthroughScreenProps, WalkthroughScreenState> {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }

  changeIndex = (index) => {
    this.setState({ index })
  }

  handleProgress = () => {
    return this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.screen}>
        <Walkthrough onChanged={this.changeIndex}>
          <Walkthrough1 />
          <Walkthrough2 />
        </Walkthrough>
        <PaginationIndicator length={2} current={this.state.index} />
        <GradientButton
          style={styles.button}
          text="GET STARTED"
        />
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 28,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
  },
}))
