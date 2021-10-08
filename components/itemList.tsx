import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FeedOrBundleObject, ItemType, SelectedFeedState } from "../utils";
import { BUNDLES_QUERY, FEEDS_QUERY } from "../utils/api/graphql";
import { NotifyError } from "./notifyError";
import { NotifyLoading } from "./notifyLoading";
import { OneListItem } from "./oneListItem";


export const ItemList = (
    {
        type,
        selected,
        setSelected,
        useSelected = false,
        allowEdits = false,
    }: {
        type: ItemType,
        selected?: SelectedFeedState,
        setSelected?: Dispatch<SetStateAction<SelectedFeedState>>,
        useSelected: boolean,
        allowEdits: boolean,
    }) => {

    const isFeed = type === ItemType.FeedType;
    const { loading, error, data } = useQuery(isFeed ? FEEDS_QUERY : BUNDLES_QUERY);
    const { feeds, bundles } = data || {};
    const itemList = isFeed ? feeds : bundles;

    useEffect(() => {
        (async () => {
            if (
                useSelected &&
                !!itemList?.length &&
                selected.id === null
            ) {
                const firstItem = itemList[0];
                await setSelected({
                    id: firstItem.id,
                    feeds: isFeed ? [firstItem] : firstItem['feeds'],
                    editMode: false,
                    newMode: false,
                });
            }
        })();
    });

    if (loading) {
        return <NotifyLoading />
    }

    if (error) {
        return <NotifyError />
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    !!itemList?.length ?
                        (
                            itemList.map((item: FeedOrBundleObject) => (
                                <OneListItem
                                    key={item.id}
                                    item={item}
                                    type={type}
                                    selected={selected}
                                    setSelected={setSelected}
                                    useSelected={useSelected}
                                    allowEdits={allowEdits}
                                />
                            ))
                        ) :
                        (
                            <p>None are present, why not add one ?</p>
                        )
                }
            </div>
        </>
    );
}
