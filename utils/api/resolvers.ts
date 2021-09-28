export const resolvers = {
    Query: {
        hello: (parent, args, context) => 'hi!',
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
        bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
        bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    },

    Mutation: {
        createFeed: (parent, { data }, { prisma }) => {
            const feed = prisma.feed.create({
                data: { ...data }
            });
            return feed;
        },

        createBundle: (parent, { data }, { prisma }) => {
            const bundle = prisma.bundle.create({
                data: { ...data }
            });
            return bundle;
        },
    }
};
