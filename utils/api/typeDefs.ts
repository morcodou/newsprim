import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type User {
        id:String
        auth0:String
        nickname:String
        picture:String
        feeds:[Feed]
        bundles:[Bundle]
        feedLikes:[Feed]
        bundleLikes:[Bundle]
    }

    type FeedTag {
        id:String
        name:String        
        feeds:[Feed]
    }

    type Feed {
        id:String
        name:String
        url:String
        author:User
        tags:[FeedTag]
        bundles:[Bundle]
        likes:[User]
    }

    input FeedInput {
        id:String
    }

    input FeedCreateInput {
        id:String
        name:String
        url:String
        tags:NestedFeedTagCreateInput
    }

    input FeedUpdateInput {
        id:String
        name:String
        url:String
        tags:NestedFeedTagUpdateInput
    }

    input NestedFeedTagUpdateInput {
        create:[FeedTagCreateInput]
        connect:[FeedTagWhereUniqueInput]
        disconnect:[FeedTagWhereUniqueInput]
    }

    input NestedFeedTagCreateInput {
        create:[FeedTagCreateInput]
        connect:[FeedTagWhereUniqueInput]
    }

    input FeedTagCreateInput {
        id:String
        name:String
    }

    input FeedTagWhereUniqueInput {
        id:String
        name:String
    }

    type BundleTag {
        id:String
        name:String        
        bundles:[Bundle]
    }

    type Bundle {
        id:String
        name:String
        description:String
        author:User
        tags:[BundleTag]
        feeds:[Feed]
        likes:[User]
    }

    input BundleInput {
        id:String
    }

    input BundleCreateInput {
        id:String
        name:String
        description:String
        tags:NestedBundleTagCreateInput
        feeds: NestedBundleFeedCreateInput
    }

    input BundleUpdateInput {
        id:String
        name:String
        description:String
        tags:NestedBundleTagUpdateInput
        feeds: NestedBundleFeedUpdateInput
    }

    input NestedBundleTagUpdateInput {
        create:[BundleTagCreateInput]
        connect:[BundleTagWhereUniqueInput]
        disconnect:[BundleTagWhereUniqueInput]
    }

    input NestedBundleFeedUpdateInput {
        create:[FeedCreateInput]
        connect:[FeedWhereUniqueInput]
        disconnect:[FeedWhereUniqueInput]
    }

    input NestedBundleFeedCreateInput {
        create:[FeedCreateInput]
        connect:[FeedWhereUniqueInput]
    }

    input FeedWhereUniqueInput {
        id:String
        url:String
    }

    input NestedBundleTagCreateInput {
        create:[BundleTagCreateInput]
        connect:[BundleTagWhereUniqueInput]
    }

    input BundleTagCreateInput {
        id:String
        name:String
    }

    input BundleTagWhereUniqueInput {
        id:String
        name:String
    }

    input LikeBundleInput {
        bundleId:String
        likeState:Boolean
    }

    input LikeFeedInput {
        feedId:String
        likeState:Boolean
    }

    input FindFeedsInput {
        search:String
    }

    input FindFeedTagsInput {
        search:String
    }

    input FindBundleTagsInput {
        search:String
    }

    type Query  {
        hello:String,
        feed(data:FeedInput):Feed,
        feeds:[Feed],
        bundle(data:BundleInput):Bundle,
        bundles:[Bundle],
        findFeedTags(data:FindFeedTagsInput):[FeedTag],
        findBundleTags(data:FindBundleTagsInput):[BundleTag],
        findFeeds(data:FindFeedsInput):[Feed],
    }


    type Mutation  {
        createFeed(data:FeedCreateInput):Feed,
        createBundle(data:BundleCreateInput):Bundle,
        likeBundle(data:LikeBundleInput):Bundle,
        likeFeed(data:LikeFeedInput):Feed,
        updateBundle(data:BundleUpdateInput):Bundle,
        updateFeed(data:FeedUpdateInput):Feed,
    }
`;