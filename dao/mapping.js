const article = require('./articles')
const comment = require('./comments')
const tag = require('./tags')


//文章（一端）与评论（多端）的关系
article.hasMany(comment);
comment.belongsTo(article);


//文章（多端）与标签（多端）的关系
tag.belongsToMany(article,{
    through:'article_tag_mapping'
});
article.belongsToMany(tag,{
    through:'article_tag_mapping'
});
