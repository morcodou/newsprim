import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../../utils/api/graphql";
import { NotifyLoading, NotifyError } from '../../components/notify'
import { Layout, OneListItem } from "../../components";
import { BundleObject, FeedObject, ItemType } from "../../utils";


const Feed = ({ id }) => {

    const { loading, error, data } = useQuery(FEED_QUERY, { variables: { data: { id } } });

    if (loading) {
        return <Layout><NotifyLoading /></Layout>
    }

    if (error) {
        return <Layout><NotifyError /></Layout>
    }

    const { feed } = data || {};

    return (
        <Layout>
            <h3 className="text-lg font-medium pt-4">{feed.name}</h3>
            <p className="pb-4">{feed.url}</p>
            <h3 className="font-medium pb-4">Bundles</h3>
            <div className="grid grid-cols-3 gap-4">
                {
                    !!feed?.bundles?.length ? (
                        feed.bundles.map((item: BundleObject) =>
                            <OneListItem
                                key={item.id}
                                item={item}
                                type={ItemType.BundleType}

                            />)

                    ) : (
                        <p>None are present, why not add one ?</p>
                    )
                }
            </div>
        </Layout>
    );
}

Feed.getInitialProps = ({ query }) => {
    const { id } = query;
    return { id };
};

export default Feed;