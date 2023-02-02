module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-latest-article',
     handler: 'get-article.getLatestArticles',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/get-recommend-article',
      handler: 'get-article.getRecommendArticles',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
