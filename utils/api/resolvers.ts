
const createFieldRoselver = (modelName, parameterName) => ({
    [parameterName]: async ({ id }, args, { prisma }) => {
        const response = await prisma[modelName].findUnique({
            where: { id },
            include: { [parameterName]: true }
        });

        return response[parameterName];
    }
})

export const resolvers = {
    Feed: {...createFieldRoselver('feed', 'author')},
    Bundle: {...createFieldRoselver('bundle', 'author')},

    Query: {
        hello: (parent, args, context) => 'hi!',
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
        bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
        bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    },

    Mutation: {
        createFeed: (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } };
            const feed = prisma.feed.create({
                data: {
                    ...data,
                    ...author
                }
            });
            return feed;
        },

        createBundle: (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } };

            const bundle = prisma.bundle.create({
                data: {
                    ...data,
                    ...author
                }
            });
            return bundle;
        },
    }
};
