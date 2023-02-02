'use strict';

/**
 * get-article service
 */

// module.exports = () => ({});
module.exports = {
    getLatestArticles: async ()=>{
        const entries = await strapi.entityService.findMany('api::article.article', {
            fields:['articleId','title','good','watched','createdAt','updatedAt'],
            sort:{updatedAt:'DESC'},
            populate:['author','paper_types']
          });
        return entries;
    },
    getRecommendArticles:async()=>{
        const entries=await strapi.entityService.findMany('api::article.article',{
            fields:['articleId','title','good','watched','createdAt','updatedAt'],
            sort:{good:'DESC'},
            populate:['author','paper_types']
        })
        return entries
    }
};
