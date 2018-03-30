import * as React from 'react'
import { Dimensions, Image, View } from 'react-native'
import { RkStyleSheet, RkText, RkTheme } from 'react-native-ui-kitten'

export function Walkthrough2() {
  const { width } = Dimensions.get('window')
  const image = RkTheme.current.name === 'light'
    ? <Image style={{ width }} source={require('../../assets/images/screensImage.png')} />
    : <Image style={{ width }} source={require('../../assets/images/screensImageDark.png')} />

  return (
    <View style={styles.screen}>
      {image}
      <RkText rkType="header2" style={styles.text}>Explore different examples of frequently used pages</RkText>
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
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
}))