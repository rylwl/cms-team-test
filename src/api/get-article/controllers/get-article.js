'use strict';

/**
 * A set of functions called "actions" for `get-article`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // },
  async getLatestArticles(ctx, next) {
    try {
      // console.log('controllers.getLatestArticles');
      const data = await strapi.service('api::get-article.get-article').getLatestArticles();
      // console.log('data',data)
      ctx.body = data;
    } catch (err) {
      ctx.badRequest('getLatestArticles error', { moreDetails: err });
    }
  },
  async getRecommendArticles(ctx, next) {
    try {
      const data = await strapi.service('api::get-article.get-article').getRecommendArticles();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest('getRecommendArticles error', { moreDetails: err });
    }
  },
  async getArticlesByPaperTypes(ctx,next){
    try {
      const data = await strapi.service('api::get-article.get-article').getArticlesByPaperTypes();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest('getArticleByPaperTypes error', { moreDetails: err });
    }
  },
  async getAuthorTopList(ctx,next){
    try{
      const data=await strapi.service('api::get-article.get-article').getAuthorTopList();
      ctx.body=data;
    }catch(err){
      ctx.badRequest('getAuthorTopList error', { moreDetails: err });
    }
  }
};
