import { FeedOrBundleObject } from "../utils"
import { Dispatch, SetStateAction } from "react";

export const GenerateInputField = ({
    name,
    currentItem,
    changeHandler
}: {
    name: string,
    currentItem: FeedOrBundleObject,
    changeHandler: Dispatch<SetStateAction<FeedOrBundleObject>>,
}) => {

    return (
        <div className="py-2">
            <label className="block py-2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input className="py-2 rounded px-3 w-full border-4"
                value={currentItem[name]}
                onChange={(e) => {
                    e.persist();
                    changeHandler(cur => ({ ...cur, [name]: e.target.value }))
                }}
            />
        </div>
    )
}