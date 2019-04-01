const apiTarget = {
  'start': 'http://localhost:3000',
  'build': 'http://localhost:3000',
};

const modeSelector = ( pathSource ) => {
  return pathSource[ JSON.parse( process.env[ 'npm_config_argv' ] )[ 'original' ][ 0 ] ];
};

const PROXY_CONFIG = [
  {
    context: [
      '/api'
    ],
    target: `${ modeSelector( apiTarget ) }`,
    secure: false,
    pathRewrite: { '^/api': '' },
  }
];

module.exports = PROXY_CONFIG;
