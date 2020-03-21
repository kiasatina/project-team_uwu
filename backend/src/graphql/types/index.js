module.exports = {
    DateTime: require('graphql-iso-date').GraphQLDateTime,
    Upload: require('graphql-upload').GraphQLUpload,
    Livestream: require('./LivestreamType'),
    PostLayer: require('./PostLayerType'),
    Post: require('./PostType'),
    User: require('./UserType'),
};
