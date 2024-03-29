const data = [
  {
    header: null,
    pages: [
      {
        name: 'Home',
        icon: 'mdi-home',
        to: '/'
      },
      {
        name: 'Trending',
        icon: 'mdi-fire',
        to: '/trending'
      },
      {
        name: 'Subscriptions',
        icon: 'mdi-youtube-subscription',
        to: '/feed/subscriptions'
      }
    ]
  },
  {
    header: null,
    pages: [
      {
        name: 'History',
        icon: 'mdi-history',
        to: '/history'
      },
      {
        name: 'Your videos',
        icon: 'mdi-video',
        to: '/videos'
      },
      {
        name: 'Liked videos',
        icon: 'mdi-thumb-up',
        to: '/liked'
      }
    ]
  }
]

export default data
