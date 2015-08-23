'use strict';

module.exports = {
  db: (process.env.DB_ADDR || 'mongodb://localhost/mean-prod'),
  /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  hostname: 'http://localhost:3000',
  app: {
    name: 'MEAN - A Modern Stack - Production'
  },
  logging: {
    format: 'combined'
  },
  strategies: {
      local: {
        enabled: true
      },
      facebook: {
        clientID: '1620620574853410',
        clientSecret: '64b11ae11e281f1b05d8654e0a6a6940',
        callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
        enabled: true
      },
      twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
        enabled: false
      },
      github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/api/auth/github/callback',
        enabled: false
      },
      google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
        enabled: false
      },
      linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/api/auth/linkedin/callback',
        enabled: false
      }
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  },
  secret: 'SOME_TOKEN_SECRET'
};
