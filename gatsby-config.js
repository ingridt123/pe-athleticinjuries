require('dotenv').config({ path: '.env' })

module.exports = {
  siteMetadata: {
    title: `Preventing Athletic Injuries`,
    description: ``,
    author: `Ingrid`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `@martinreiche/gatsby-firestore`,
      options: {
        // credential or appConfig
        // credential: require(`./credentials.json`),
        appConfig: {
          apiKey: process.env.GATSBY_FIREBASE_APIKEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
          projectId: process.env.GATSBY_FIREBASE_PROJECTID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
          appId: process.env.GATSBY_FIREBASE_APPID,
        },
        types: [
          {
            type: `BodyPart`,
            collection: `body-parts`,
            map: doc => ({
              type: doc.type,
              description: doc.description,
            }),
            subCollections: [
              {
                type: `ExerciseMyofascial`,
                collection: `myofascial`,
                map: doc => ({
                  title: doc.title,
                  gifUrl: doc.gifUrl,
                  description: doc.description,
                }),
              },
              {
                type: `ExerciseStrengthening`,
                collection: `strengthening`,
                map: doc => ({
                  title: doc.title,
                  gifUrl: doc.gifUrl,
                  description: doc.description,
                }),
              },
              {
                type: `ExerciseStretching`,
                collection: `stretching`,
                map: doc => ({
                  title: doc.title,
                  gifUrl: doc.gifUrl,
                  description: doc.description,
                }),
              },
            ],
          },
          {
            type: `General`,
            collection: `general`,
            map: doc => ({
              description: doc.description,
            }),
            subCollections: [
              {
                type: `ExerciseUpper`,
                collection: `upper`,
                map: doc => ({
                  title: doc.title,
                  gifUrl: doc.gifUrl,
                  description: doc.description,
                })
              },
              {
                type: `ExerciseLower`,
                collection: `lower`,
                map: doc => ({
                  title: doc.title,
                  gifUrl: doc.gifUrl,
                  description: doc.description,
                })
              },
            ]
          }
        ],
      },
    },
  ],
};
