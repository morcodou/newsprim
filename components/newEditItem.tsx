import { useMutation } from "@apollo/client";
import { useState } from "react";
import { BadgeList, GenerateInputField } from ".";
import {
    ActionType,
    BadgeFieldName,
    BundleObject,
    FeedObject,
    ItemType,
    NewItemState,
    SearchQueryName
} from "../utils";
import { CREATE_BUNDLE_MUTATION, CREATE_FEED_MUTATION, FIND_BUNDLE_TAGS_QUERY, FIND_FEEDS_QUERY, FIND_FEED_TAGS_QUERY } from "../utils/api/graphql";
import { SearchItems } from "./searchItems";
import { ErrorSign, WaitingClock } from "./svg";

export const NewEditItem = ({ type }: { type: ItemType }) => {

    const isFeed = type == ItemType.FeedType;
    const initialFeed: FeedObject = { name: '', url: '', tags: [] };
    const initialBundle: BundleObject = { name: '', description: '', tags: [], feeds: [] };

    const initialState: NewItemState = getInitialState(isFeed);

    const [currentItem, setItem] = useState<NewItemState>(initialState);

    const [createItemMutation,
        {
            loading: loadingCreation,
            error: errorCreation
        }
    ] = useMutation(isFeed ? CREATE_FEED_MUTATION : CREATE_BUNDLE_MUTATION);

    if (loadingCreation) {
        return (
            <WaitingClock className="my-20 h-10 w-10 text-gray-500 m-auto" />
        );
    }

    if (errorCreation) {
        return (
            <ErrorSign className="my-20 h-10 w-10 text-gray-500 m-auto" />
        );
    }


    const inputFields = getInputFields(isFeed);
    const color = getColor(isFeed);
    const queryName = getQueryName(isFeed);
    const query = getQuery(isFeed);

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-12 gap-4 rounded-md border-4 my-4 py-2 px-4">
                    <h3 className="col-span-12 text-lg font-medium py-2">
                        {getTitle(isFeed)}
                    </h3>
                    <div className="col-span-6">
                        {
                            inputFields.map((name) => (
                                <GenerateInputField
                                    key={`${type}-${name}`}
                                    name={name}
                                    currentItem={currentItem}
                                    changeHandler={setItem}
                                />
                            ))
                        }
                        <div className={`py-4 ${isFeed ? null : 'pt-20'}`}>
                            <input
                                className={`py-4 bg-${color}-400 hover:bg-${color}-700 text-white font-bold px-12 rounded`}
                                type="submit"
                            />
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="py-2">
                            <label className="block py-2">Tags:</label>
                            <div className="grid grid-cols-3 gap-2">
                                <BadgeList
                                    fieldName={BadgeFieldName.tags}
                                    action={ActionType.CREATE}
                                    item={currentItem}
                                    setItem={setItem}
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <label className="block py-2">Add New Tag:</label>
                            <SearchItems
                                currentItem={currentItem}
                                setItem={setItem}
                                query={query}
                                queryName={queryName}
                                fieldName={BadgeFieldName.tags}
                            />
                        </div>

                        {isFeed ? null : (
                            <>
                                <div className="py-2">
                                    <label className="block py-2">Feeds:</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <BadgeList
                                            fieldName={BadgeFieldName.feeds}
                                            action={ActionType.CREATE}
                                            item={currentItem}
                                            setItem={setItem}
                                        />
                                    </div>
                                </div>
                                <div className="py-2">
                                    <label className="block py-2">Add New Feed:</label>
                                    <SearchItems
                                        currentItem={currentItem}
                                        setItem={setItem}
                                        query={FIND_FEEDS_QUERY}
                                        queryName={SearchQueryName.findFeeds}
                                        fieldName={BadgeFieldName.feeds}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </form>
        </>
    )
}

const handleSubmit = (e) => {
    e.preventDefault();
}

const getInitialState = (isFeed: boolean): NewItemState => {
    if (isFeed) {
        const initialFeed: FeedObject = { name: '', url: '', tags: [] };
        return initialFeed;
    }
    const initialBundle: BundleObject = { name: '', description: '', tags: [], feeds: [] };
    return initialBundle;
};

const getTitle = (isFeed: boolean): string => isFeed ? 'New Feed' : 'New Bundle';
const getInputFields = (isFeed: boolean): string[] => isFeed ? ['name', 'url'] : ['name', 'description'];
const getColor = (isFeed: boolean): string => isFeed ? 'green' : 'purple';
const getQueryName = (isFeed: boolean): SearchQueryName => isFeed ? SearchQueryName.findFeedTags : SearchQueryName.findBundleTags;
const getQuery = (isFeed: boolean) => isFeed ? FIND_FEED_TAGS_QUERY : FIND_BUNDLE_TAGS_QUERY;
