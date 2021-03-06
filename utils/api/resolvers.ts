import { verifyOwnership } from ".";

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
    Feed: {
        ...createFieldRoselver('feed', 'author'),
        ...createFieldRoselver('feed', 'tags'),
        ...createFieldRoselver('feed', 'bundles'),
        ...createFieldRoselver('feed', 'likes'),
        ...createFieldRoselver('feed', 'savedArticles'),
    },

    Bundle: {
        ...createFieldRoselver('bundle', 'author'),
        ...createFieldRoselver('bundle', 'tags'),
        ...createFieldRoselver('bundle', 'feeds'),
        ...createFieldRoselver('bundle', 'likes'),
    },

    BundleTag: {
        ...createFieldRoselver('bundleTag', 'bundles'),
    },

    FeedTag: {
        ...createFieldRoselver('feedTag', 'feeds'),
    },

    SavedArticle: {
        ...createFieldRoselver('savedArticle', 'feed'),
        ...createFieldRoselver('savedArticle', 'author'),
    },

    User: {
        ...createFieldRoselver('user', 'feeds'),
        ...createFieldRoselver('user', 'bundles'),
        ...createFieldRoselver('user', 'feedLikes'),
        ...createFieldRoselver('user', 'bundleLikes'),
    },

    Query: {
        hello: (parent, args, context) => 'hi!',
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
        bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
        bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
        findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({
            where: { name: { contains: data.search } }
        }),
        findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({
            where: { name: { contains: data.search } }
        }),
        findFeeds: (parent, { data }, { prisma }) => prisma.feed.findMany({
            where: { name: { contains: data.search } }
        }),
        savedArticle: async (parent, { data: { url } }, { prisma, user: { id: authorId } }) => {

            const savedArticles = await prisma.savedArticle.findMany({
                where: { url, authorId }
            });

            return savedArticles[0];
        },
        savedArticles: (parent, args, { prisma, user: { id: authorId } }) => prisma.savedArticle.findMany({
            where: { authorId: authorId ? authorId : null }
        }),
        me: (parent, args, { prisma, user: { id } }) => prisma.user.findUnique({ where: { id } }),
    },

    Mutation: {
        createFeed: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } };
            const feed = prisma.feed.create({
                data: {
                    ...data,
                    ...author
                }
            });
            return feed;
        },

        createBundle: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } };

            const bundle = prisma.bundle.create({
                data: {
                    ...data,
                    ...author
                }
            });
            return bundle;
        },

        likeBundle: (parent, { data }, { prisma, user }) => {

            const { bundleId, likeState } = data;
            const connectState = likeState ? 'connect' : 'disconnect';
            return prisma.bundle.update(
                {
                    where: { id: bundleId },
                    data: { likes: { [connectState]: { id: user.id } } }
                }
            );
        },

        likeFeed: (parent, { data }, { prisma, user }) => {

            const { feedId, likeState } = data;
            const connectState = likeState ? 'connect' : 'disconnect';
            return prisma.feed.update(
                {
                    where: { id: feedId },
                    data: { likes: { [connectState]: { id: user.id } } }
                }
            );
        },

        updateFeed: async (parent, { data: { id, ...feedUpdate } }, { prisma, user }) => {
            const feed = await prisma.feed.findUnique({
                where: { id },
                include: { author: true }
            });

            await verifyOwnership(feed, user);
            return prisma.feed.update(
                {
                    where: { id },
                    data: { ...feedUpdate }
                }
            );
        },

        updateBundle: async (parent, { data: { id, ...bundleUpdate } }, { prisma, user }) => {
            const bundle = await prisma.bundle.findUnique({
                where: { id },
                include: { author: true }
            });

            await verifyOwnership(bundle, user);
            return prisma.bundle.update(
                {
                    where: { id },
                    data: { ...bundleUpdate }
                }
            );
        },

        createSavedArticle: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } };
            const savedArticle = prisma.savedArticle.create({
                data: { ...data, ...author }
            });
            return savedArticle;
        },

        deleteSavedArticle: async (parent, { data: { id } }, { prisma, user }) => {
            const savedArticle = await prisma.savedArticle.findUnique({
                where: { id },
                include: { author: true }
            });

            await verifyOwnership(savedArticle, user);
            await prisma.savedArticle.delete({ where: { id: savedArticle.id } });
            return savedArticle;
        },

        deleteBundle: async (parent, { data: { id } }, { prisma, user }) => {

            const bundle = await prisma.bundle.findUnique({
                where: { id },
                include: { author: true }
            });

            await verifyOwnership(bundle, user);
            await prisma.bundle.delete({ where: { id: bundle.id } });
            return bundle;
        },


        deleteFeed: async (parent, { data: { id } }, { prisma, user }) => {

            const feed = await prisma.feed.findUnique({
                where: { id },
                include: { author: true }
            });

            await verifyOwnership(feed, user);
            await prisma.feed.delete({ where: { id: feed.id } });
            return feed;
        },

    }
};
