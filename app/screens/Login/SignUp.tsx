import * as React from 'react'
import {
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
import { GradientButton } from '../../components/'
import { scaleVertical } from '../../utils/scale'

interface SignUpProps {
  navigation: any;
}

interface SignUpState {
  /* */
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
  }

  render() {
    const renderIcon = () => {
      if (RkTheme.current.name === 'light') {
        return <Image style={styles.image} source={require('../../assets/images/logo.png')} />
      }
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')} />
    }
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={{ alignItems: 'center' }}>
          {renderIcon()}
          <RkText rkType="h1">Registration</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType="rounded" placeholder="Name" />
            <RkTextInput rkType="rounded" placeholder="Email" />
            <RkTextInput rkType="rounded" placeholder="Password" secureTextEntry={true} />
            <RkTextInput rkType="rounded" placeholder="Confirm Password" secureTextEntry={true} />
            <GradientButton style={styles.save} rkType="large" text="SIGN UP" onPress={() => {
              this.props.navigation.goBack()
            }} />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType="primary3">Already have an account?</RkText>
              <RkButton rkType="clear" onPress={() => this.props.navigation.navigate('Login1')}>
                <RkText rkType="header6"> Sign in now </RkText>
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
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
    justifyContent: 'space-between',
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}))