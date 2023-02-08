'use strict';

/**
 * get-article service
 */

// module.exports = () => ({});
module.exports = {
    getLatestArticles: async () => {
        const entries = await strapi.entityService.findMany('api::article.article', {
            fields: ['articleId', 'title', 'good', 'watched','sketch','cover', 'createdAt', 'updatedAt'],
            sort: { updatedAt: 'DESC' },
            populate: ['author', 'paper_types']
        });
        return entries;
    },
    getRecommendArticles: async () => {
        const entries = await strapi.entityService.findMany('api::article.article', {
            fields: ['articleId', 'title', 'good', 'watched','sketch','cover', 'createdAt', 'updatedAt'],
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
            fields: ['articleId', 'title', 'good', 'watched','sketch','cover', 'createdAt', 'updatedAt'],
            filters: {
                paper_types: {
                    paperTypeId: {
                        $in: types
                    }
                }
            },
            populate: ['author', 'paper_types']
        })
        return entries;
    },
    getAuthorTopList:async ()=>{
        const goodList=await strapi.entityService.findMany('api::article.article',{
            fields:['good'],
            populate:['author']
        })
        let authorMap=new Map;
        let authorInfoMap=new Map;
        goodList.forEach(element => {
            if(authorMap.has(element.author.id)){
                authorMap.set(element.author.id,Number(element.good)+Number(authorMap.get(element.author.id)));
            }else{
                authorMap.set(element.author.id,Number(element.good));
                authorInfoMap.set(element.author.id,{
                    authorName:element.author.authorName,
                    position:element.author.position,
                    company:element.author.company,
                    information:element.author.information,
                    avatar:element.author.avatar
                })
            }
        });
        let authorListArr=new Array;
        authorMap.forEach((value,key)=>{
            let tempInfo=authorInfoMap.get(key);
            authorListArr.push({
                authorId:key,
                good:value,
                ...tempInfo
            })
        })
        authorListArr.sort((first,last)=>{return last.good-first.good});
        return authorListArr;
    }
};
