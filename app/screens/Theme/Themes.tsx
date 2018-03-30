import * as React from 'react'
import { Image, Platform, StatusBar, View } from 'react-native'
import { RkStyleSheet, RkText, RkTheme } from 'react-native-ui-kitten'
import { GradientButton } from '../../components/GradientButton'
import DarkKittenTheme from '../../config/darkTheme'
import KittenTheme from '../../config/theme'
import { scale, scaleVertical } from '../../utils/scale'

export class Themes extends React.Component {
  static navigationOptions = {
    title: 'Theme'.toUpperCase(),
  };

  constructor(props) {
    super(props)
  }

  handleLightThemeButtonPress = () => {
    StatusBar.setBarStyle('dark-content', true)
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(KittenTheme.colors.screen.base)
    }
    RkTheme.setTheme(KittenTheme)
  }

  handleDarkThemeButtonPress = () => {
    RkTheme.setTheme(DarkKittenTheme)
    StatusBar.setBarStyle('light-content', true)
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(DarkKittenTheme.colors.screen.base)
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <RkText>Light Theme</RkText>
          <Image style={styles.image} source={require('../../assets/images/lightThemeImage.png')} />
          <GradientButton
            text="APPLY"
          />
        </View>
        <View style={styles.container}>
          <RkText>Dark Theme</RkText>
          <Image style={styles.image} source={require('../../assets/images/darkThemeImage.png')} />
          <GradientButton
            text="APPLY"
          />
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    paddingHorizontal: scale(72),

  },
  image: {
    height: scaleVertical(160),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleVertical(20),
  },
}))