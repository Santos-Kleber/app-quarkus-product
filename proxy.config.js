const proxy = [
  {
    context: ['/api'],
    target: 'https://app-quarkus-product.herokuapp.com',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/api':''}
  }
];
module.exports = proxy;


//https://app-quarkus-product.herokuapp.com/products <<< producao
//changeOrigin: true, <<< obrigatório em producao
//http://localhost:8080 <<< desenv
// subir app com npm run start
//protocol: 'https',
