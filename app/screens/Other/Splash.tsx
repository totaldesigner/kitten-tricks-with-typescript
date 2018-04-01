import * as React from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native'
import { RkText, RkTheme } from 'react-native-ui-kitten'
import { NavigationActions } from 'react-navigation'
import { ProgressBar } from '../../components'
import KittenTheme from '../../config/theme'
import { scale, scaleVertical } from '../../utils/scale'

const timeFrame = 500

interface SplashScreenProps {
  navigation: any
}

interface SplashScreenState {
  progress: any
}

export class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState> {
  private timer

  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none')
    RkTheme.setTheme(KittenTheme)

    this.timer = setInterval(() => {
      if (this.state.progress === 1) {
        clearInterval(this.timer)
        setTimeout(() => {
          StatusBar.setHidden(false, 'slide')
          const toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          })
          this.props.navigation.dispatch(toHome)
        }, timeFrame)
      } else {
        const random = Math.random() * 0.5
        let progress = this.state.progress + random
        if (progress > 1) {
          progress = 1
        }
        this.setState({ progress })
      }
    }, timeFrame)

  }

  render() {
    const width = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <View>
          <Image style={[styles.image, { width }]} source={require('../../assets/images/splashBack.png')} />
          <View style={styles.text}>
            <RkText rkType="light" style={styles.hero}>React Native</RkText>
            <RkText rkType="logo" style={styles.appName}>UI Kitten</RkText>
          </View>
        </View>
        <ProgressBar
          color={RkTheme.current.colors.accent}
          style={styles.progress}
          progress={this.state.progress} width={scale(320)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: KittenTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    height: scaleVertical(430),
  },
  text: {
    alignItems: 'center',
  },
  hero: {
    fontSize: 37,
  },
  appName: {
    fontSize: 62,
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5',
  },
})