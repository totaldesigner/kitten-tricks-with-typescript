import * as React from 'react'
import {
  Image,
  View,
} from 'react-native'
import {
  RkStyleSheet,
  RkText,
  RkTheme,
} from 'react-native-ui-kitten'

export function Walkthrough1() {
  const image = RkTheme.current.name === 'light'
    ? <Image source={require('../../assets/images/kittenImage.png')} />
    : <Image source={require('../../assets/images/kittenImageDark.png')} />

  return (
    <View style={styles.screen}>
      {image}
      <RkText rkType="header2" style={styles.text}>Welcome to Kitten</RkText>
    </View>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    marginTop: 20,
  },
}))
