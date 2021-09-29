import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type User {
        id:String
        auth0:String
        nickname:String
        picture:String
        feeds:[Feed]
        bundles:[Bundle]
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
    }

    input BundleInput {
        id:String
    }

    input BundleCreateInput {
        id:String
        name:String
        description:String
    }

    type Query  {
        hello:String,
        feed(data:FeedInput):Feed,
        feeds:[Feed],
        bundle(data:BundleInput):Bundle,
        bundles:[Bundle]    
    }

    type Mutation  {
        createFeed(data:FeedCreateInput):Feed,
        createBundle(data:BundleCreateInput):Bundle,
    }
`;