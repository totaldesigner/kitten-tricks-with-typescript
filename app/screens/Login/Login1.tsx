import * as React from 'react'
import {
  Dimensions,
  Image,
  Keyboard,
  View,
} from 'react-native'
import {
  RkAvoidKeyboard,
  RkButton,
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkTheme,
} from 'react-native-ui-kitten'
import { FontAwesome } from '../../assets/icons'
import { GradientButton } from '../../components/GradientButton'
import { scaleModerate, scaleVertical } from '../../utils/scale'

interface LoginV1Props {
  navigation: any
}

interface LoginV1State {
  /* */
}

export class LoginV1 extends React.Component<LoginV1Props, LoginV1State> {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
  }

  _renderImage() {
    const contentHeight = scaleModerate(375, 1)
    const height = Dimensions.get('window').height - contentHeight
    const width = Dimensions.get('window').width
    let image

    if (RkTheme.current.name === 'light') {
      image = (<Image style={[styles.image, { height, width }]}
        source={require('../../assets/images/backgroundLoginV1.png')} />)
    }
    else {
      image = (<Image style={[styles.image, { height, width }]}
        source={require('../../assets/images/backgroundLoginV1DarkTheme.png')} />)
    }
    return image
  }

  render() {
    const image = this._renderImage()

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero accentColor">{FontAwesome.twitter}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero accentColor">{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero accentColor">{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>
          <RkTextInput rkType="rounded" placeholder="Username" />
          <RkTextInput rkType="rounded" placeholder="Password" secureTextEntry={true} />
          <GradientButton text="LOGIN" rkType="large" onPress={() => {
            this.props.navigation.goBack()
          }} />
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType="primary3">Don’t have an account?</RkText>
              <RkButton rkType="clear">
                <RkText rkType="header6" onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
}))