export const resolvers = {
    Query: {
        hello: (parent, args, context) => 'hi!',
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    },

    Mutation: {
        createFeed: (parent, { data }, { prisma }) => {
            const feed = prisma.feed.create({
                data: { ...data }
            });
            return feed;
        },

    }
};
