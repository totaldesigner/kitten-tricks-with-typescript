import { Analytics, PageHit } from 'expo-analytics'

const googleAnalyticsId = 'UA-112172761-2'

const analytics = new Analytics(googleAnalyticsId)

const track = screen => analytics.hit(new PageHit(screen))

export default track