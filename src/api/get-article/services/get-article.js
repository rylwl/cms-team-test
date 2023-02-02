'use strict';

/**
 * get-article service
 */

// module.exports = () => ({});
module.exports = {
    getLatestArticles: async () => {
        const entries = await strapi.entityService.findMany('api::article.article', {
            fields: ['articleId', 'title', 'good', 'watched', 'createdAt', 'updatedAt'],
            sort: { updatedAt: 'DESC' },
            populate: ['author', 'paper_types']
        });
        return entries;
    },
    getRecommendArticles: async () => {
        const entries = await strapi.entityService.findMany('api::article.article', {
            fields: ['articleId', 'title', 'good', 'watched', 'createdAt', 'updatedAt'],
            sort: { good: 'DESC' },
            populate: ['author', 'paper_types']
        })
        return entries;
    },
    getArticlesByPaperTypes: async () => {
        const ctx = strapi.requestContext.get();
        const query = ctx.request.query;
        if (query == null || query.types == null) { throw new ApplicationError('query should have types'); }
        const types = query.types.split(',')

        const entries = await strapi.entityService.findMany('api::article.article', {
            fields: ['articleId'],
            filters: {
                paper_types: {
                    paperTypeId: {
                        $in: types
                    }
                }
            },
        })
        return entries;
    },
    getAuthorTopList:async ()=>{
        const goodList=await strapi.entityService.findMany('api::article.article',{
            fields:['good'],
            populate:['author']
        })
        let authorMap=new Map;
        goodList.forEach(element => {
            if(authorMap.has(element.author.id)){
                authorMap.set(element.author.id,Number(element.good)+Number(authorMap.get(element.author.id)));
            }else{
                authorMap.set(element.author.id,Number(element.good));
            }
        });
        let authorListArr=new Array;
        authorMap.forEach((value,key)=>{
            authorListArr.push({
                authorId:key,
                good:value
            })
        })
        authorListArr.sort((first,last)=>{return last.good-first.good});
        return authorListArr;
    }
};
