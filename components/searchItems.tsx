import { ActionType, BadgeFieldName, FeedOrBundleObject, SearchQueryName } from "../utils";
import { Dispatch, SetStateAction, useState, } from "react";
import { DocumentNode } from "graphql";
import { Search, Spin } from "./svg";
import { useLazyQuery } from "@apollo/client";
import { BadgeList } from ".";
import * as _ from 'lodash';

export const SearchItems = ({
    currentItem,
    setItem,
    query,
    queryName,
    fieldName
}: {
    currentItem: FeedOrBundleObject,
    setItem: Dispatch<SetStateAction<FeedOrBundleObject>>,
    query: DocumentNode,
    queryName: SearchQueryName,
    fieldName: BadgeFieldName
}) => {

    const [search, setSearch] = useState('');

    const [findItemsQuery, { loading, data, called }] = useLazyQuery(query, {
        fetchPolicy: 'network-only'
    });

    const fetchedItems = _.get(data, queryName);
    const filteredItems = fetchedItems?.filter(item =>
        !currentItem[fieldName].map(o => o.name).includes(item.name)
    ) || [];

    const matchCurrent = filteredItems.filter(o => o.name === search);
    const matchList = currentItem[fieldName].filter(o => o.name === search);
    const filteredItemsWithAdd = !matchCurrent.length &&
        !matchList.length &&
        queryName !== SearchQueryName.findFeeds ?
        [...filteredItems, { name: search }] : filteredItems;


    const dummyNewItem = {
        ...currentItem,
        [fieldName]: filteredItemsWithAdd,
    };

    return (
        <div>
            <div className="flex">
                {loading ? (
                    <Spin className="h-6 w-6 text-gray-500 animate-spin" />
                ) : (
                    <Search className="mt-3 mr-2 h-6 w-6 text-gray-500" />
                )}

                <input className="border-4 rounded w-full py-2 px-3"
                    value={search}
                    onChange={(e) => {
                        e.persist();
                        const value = e.target.value;
                        if (value !== search) {
                            setSearch(() => value);
                            findItemsQuery({
                                variables: {
                                    data: {
                                        search: value
                                    }
                                }
                            })
                        }
                    }}
                />
            </div>
            <div className="grid grid-cols-3 gap-2 flex m-2">
                {search ? (
                    <BadgeList
                        action={ActionType.ADD}
                        fieldName={fieldName}
                        setItem={setItem}
                        item={dummyNewItem}
                    />
                ) : called ? (
                    <p className="text-gray-400 "> No matches</p>
                ) : null}
            </div>
        </div>
    )
}
