import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { RkButton, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/Avatar'
import { Gallery } from '../../components/Gallery'
import { data } from '../../data/'
import formatNumber from '../../utils/textUtils'

interface ProfileV1Props {
  navigation: any;
}

interface ProfileV1State {
  /* */
}

export class ProfileV1 extends React.Component<ProfileV1Props, ProfileV1State> {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase(),
  };
  private user

  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state
    const id = params ? params.id : 1
    this.user = data.getUser(id)
  }

  render() {
    const name = `${this.user.firstName} ${this.user.lastName}`
    const images = this.user.images
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={this.user.photo} rkType="big" />
          <RkText rkType="header2">{name}</RkText>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>{this.user.postCount}</RkText>
            <RkText rkType="secondary1 hintColor">Posts</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>{formatNumber(this.user.followersCount)}</RkText>
            <RkText rkType="secondary1 hintColor">Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType="header3" style={styles.space}>{this.user.followingCount}</RkText>
            <RkText rkType="secondary1 hintColor">Following</RkText>
          </View>
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType="clear link">FOLLOW</RkButton>
          <View style={styles.separator} />
          <RkButton style={styles.button} rkType="clear link">MESSAGE</RkButton>
        </View>
        <Gallery items={images} />
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
}))