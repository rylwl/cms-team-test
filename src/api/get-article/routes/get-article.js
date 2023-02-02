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
    {
      method: 'GET',
      path: '/get-articles-by-types',
      handler: 'get-article.getArticlesByPaperTypes',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/get-author-list',
      handler: 'get-article.getAuthorTopList',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
