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

    type Feed {
        id:String
        name:String
        url:String
        author:User
    }

    input FeedInput {
        id:String
    }

    input FeedCreateInput {
        id:String
        name:String
        url:String
    }

    type Bundle {
        id:String
        name:String
        description:String
        author:User
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