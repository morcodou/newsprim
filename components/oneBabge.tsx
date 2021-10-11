import { Dispatch, SetStateAction } from "react";
import {
    ActionType,
    BadgeFieldName,
    FeedOrBundleObject,
    SelectedFeedState
} from "../utils";

export const OneBadge = (
    {
        fieldName,
        action,
        setItem,
        item,
        currentItem

    }: {
        fieldName: BadgeFieldName,
        action: ActionType,
        setItem?: Dispatch<SetStateAction<SelectedFeedState>>,
        item: FeedOrBundleObject,
        currentItem?: FeedOrBundleObject,
    }) => {

    const color = getColor(fieldName);

    return (
        <div className="inline-block align-middle">
            <span className={`flex justify-center text-sm py-2 px-2 rounded-lg bg-${color}-200`}>
                <p className={`text-xs text-${color}-600 text-center`}>
                    {item.name}
                </p>
            </span>
        </div>
    );
}

const getColor = (fieldName: BadgeFieldName): string =>
    fieldName === BadgeFieldName.tags ? 'blue' :
        fieldName === BadgeFieldName.feeds ? 'green' : 'purple';
