import * as _ from 'lodash'
import articles from './raw/articles'
import conversations from './raw/conversations'
import notifications from './raw/notifications'
import users from './raw/users'

/* tslint:disable */
function populateArticles() {
  for (const article of articles) {
    const userId = articles.indexOf(article) % users.length
    article.user = _.find(users, x => x.id === userId) || users[0]
    for (const comment of article.comments) {
      // const userId2 = article.comments.indexOf(comment) % users.length
      // comment.user = _.find(users, x => x.id === userId2) || users[0]
      comment.user = users[0] as any
    }
  }
}

function populateNotifications() {
  for (const notification of notifications) {
    const userId = notifications.indexOf(notification) % users.length
    notification.user = _.find(users, x => x.id === userId) || users[0]
  }
}

function populateConversations() {
  for (const conversation of conversations) {
    conversation.withUser = _.find(users, x => x.id === conversation.withUserId) || users[0]
  }
}

const populate = () => {
  populateArticles()
  populateNotifications()
  populateConversations()
}

export default populate
