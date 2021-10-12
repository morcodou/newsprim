import { useQuery } from "@apollo/client";
import { BUNDLE_QUERY } from "../../utils/api/graphql";
import { NotifyLoading, NotifyError } from '../../components/notify'
import { Layout, OneListItem } from "../../components";
import { FeedObject, ItemType } from "../../utils";


const Bundle = ({ id }) => {

    const { loading, error, data } = useQuery(BUNDLE_QUERY, { variables: { data: { id } } });

    if (loading) {
        return <Layout><NotifyLoading /></Layout>
    }

    if (error) {
        return <Layout><NotifyError /></Layout>
    }

    const { bundle } = data || {};

    return (
        <Layout>
            <h3 className="text-lg font-medium pt-4">{bundle.name}</h3>
            <p className="pb-4">{bundle.description}</p>
            <h3 className="font-medium pb-4">Feeds</h3>
            <div className="grid grid-cols-3 gap-4">
                {
                    !!bundle?.feeds?.length ? (
                        bundle.feeds.map((item: FeedObject) =>
                            <OneListItem
                                key={item.id}
                                item={item}
                                type={ItemType.FeedType}

                            />)

                    ) : (
                        <p>None are present, why not add one ?</p>
                    )
                }
            </div>
        </Layout>
    );
}

Bundle.getInitialProps = ({ query }) => {
    const { id } = query;
    return { id };
};

export default Bundle;