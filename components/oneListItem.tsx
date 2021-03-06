import { Dispatch, SetStateAction } from "react";
import {
    ActionType,
    BadgeFieldName,
    FeedOrBundleObject,
    ItemType,
    SelectedFeedState
} from "../utils";
import { DoubleArrowDown, DoubleArrowRight } from "./svg";
import Link from 'next/link';
import { BadgeList } from ".";

export const OneListItem = (
    { item,
        type,
        selected,
        setSelected,
        useSelected = false,
        allowEdits = false,
    }: {
        type: ItemType,
        item: FeedOrBundleObject,
        selected?: SelectedFeedState,
        setSelected?: Dispatch<SetStateAction<SelectedFeedState>>,
        useSelected?: boolean,
        allowEdits?: boolean,
    }) => {

    const isFeed = type === ItemType.FeedType;
    const isSelected = useSelected && selected?.id === item.id;
    const color = getColor(isFeed);
    const title = getTitle(isFeed);
    const link = getLink(isFeed);
    const badgeFieldName = getBadgeFieldName(isFeed);

    return (
        <Link href={`/${link}/${item.id}`} >
            <div>
                <div className={`
        cursor-pointer grid grid-cols-6 p-4 rounded-lg
        border-t-4 border-l-4 border-r-4
        ${useSelected ? 'rounded-b-none' : 'border-b-4'}
        ${isSelected
                        ? `border-${color}-400`
                        : 'border-gray-300'
                    }
        `}>
                    <div className="col-span-4">
                        <h4 className="font-bold"> {item.name}</h4>
                        {isFeed ? null : (<p>{item['description']}</p>)}
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <p>actions</p>
                    </div>

                    <div className="flex col-span-6 py-0 space-x-2">
                        {item.author ? (<p>profile pic</p>) : null}
                    </div>

                    <div className="col-span-6 py-2">
                        <h3>Tags</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <BadgeList item={item}
                                action={ActionType.NONE}
                                fieldName={BadgeFieldName.tags}
                            />
                        </div>
                    </div>

                    <div className="col-span-6 py-2">
                        <h3>{title}</h3>
                        <div className="grid grid-cols-3 gap-2">
                        <BadgeList item={item}
                                action={ActionType.NONE}
                                fieldName={badgeFieldName}
                            />
                        </div>
                    </div>
                </div>

                {useSelected ?
                    (<>
                        {isSelected ?
                            (
                                <p
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}

                                    className={`flex rounded-lg rounded-t-none align-middle
                            ${isSelected ? `bg-${color}-400` : `bg-gray-300`}
                            p-4 z-10 text-white cursor-pointer
                            `}>
                                    <DoubleArrowDown className="h-5 w-5 text-white-500 mr-2 mt-1" />
                                    {` Hide ${title} Articles`}
                                </p>
                            ) : (
                                <p
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelected({
                                            id: item.id,
                                            feeds: isFeed ? [item] : item['feeds'],
                                            editMode: false,
                                            newMode: false,
                                        });
                                    }}

                                    className={`flex rounded-lg rounded-t-none align-middle
                            ${isSelected ? `bg-${color}-400` : `bg-gray-300`}
                            p-4 z-10 text-white cursor-pointer
                            `}>
                                    <DoubleArrowRight className="h-5 w-5 text-white-500 mr-2 mt-1" />
                                    {` Show ${title} Articles`}
                                </p>
                            )}
                    </>) : null
                }
            </div>
        </Link>
    );
}

const getColor = (isFeed: boolean): string => isFeed ? 'green' : 'purple';
const getTitle = (isFeed: boolean): string => isFeed ? 'Bundle' : 'Feed';
const getLink = (isFeed: boolean): string => isFeed ? 'feed' : 'bundle';
const getBadgeFieldName = (isFeed: boolean): BadgeFieldName => isFeed ? BadgeFieldName.bundles : BadgeFieldName.feeds;