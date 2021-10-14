import { Dispatch, SetStateAction } from "react";
import {
    ActionType,
    BadgeFieldName,
    BundleObject,
    FeedObject,
    FeedOrBundleObject,
    SelectedFeedState
} from "../utils";

import { Minus, Plus } from "../components/svg";


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
        setItem?: Dispatch<SetStateAction<FeedObject | BundleObject>>,
        item: FeedOrBundleObject,
        currentItem?: FeedOrBundleObject,
    }) => {

    const color = getColor(fieldName);

    return (
        <div className="inline-block align-middle">
            <span className={`flex justify-center text-sm py-2 px-2 rounded-lg bg-${color}-200`}>
                {action === ActionType.ADD ? (
                    <div
                        onClick={() => {
                            setItem(currentState => ({
                                ...currentState,
                                [fieldName]: [...currentState[fieldName], { ...item }]
                            }))
                        }}
                    >
                        <Plus className="h-4 w-4 text-gray-500" />

                    </div>
                ) : null}
                {action === ActionType.CREATE ? (
                    <div
                        onClick={() => {
                            setItem(currentState => ({
                                ...currentState,
                                [fieldName]: currentState[fieldName].filter(o => item.name !== o.name)
                            }))
                        }}
                    >
                        <Minus className="h-4 w-4 text-gray-500" />

                    </div>
                ) : null}

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
