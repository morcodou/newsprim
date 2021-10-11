import { Dispatch, SetStateAction } from "react";
import { ActionType, BadgeFieldName, FeedOrBundleObject, SelectedFeedState } from "../utils";
import { OneBadge } from "./oneBabge";


export const BadgeList = (
    {
        fieldName,
        action,
        setItem,
        item
    }: {
        fieldName: BadgeFieldName,
        action: ActionType,
        setItem?: Dispatch<SetStateAction<SelectedFeedState>>,
        item: FeedOrBundleObject
    }) => {

    if (!item[fieldName]?.length)
        return (
            <p className="text-gray-400">None found</p>
        );

    return (
        <>
            {item[fieldName].map(badge => (
                <OneBadge
                    action={action}
                    item={item}
                    fieldName={fieldName}
                    key={`${item['id']}-${badge.name}`}
                />
            ))}
        </>
    );
}
