import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { ItemList, Layout,NewEditItem } from "../components";
import { ItemType, SelectedFeedState } from "../utils";
import { Minus, Plus } from "../components/svg";

const FeedsPage = () => {

    const initialSelected: SelectedFeedState = {
        id: null,
        feeds: [],
        editMode: false,
        newMode: false
    };

    const [selected, setSelected] = useState(initialSelected);
    const { user, error, isLoading } = useUser();
    const modeColor = getModeColor(selected.newMode);

    return (
        <Layout>
            <div className="grid grid-cols-2">
                <h3 className="grid-cols-1 justify-start flex text-lr font-medium py-4">Feeds Page</h3>
            
                {user ? (
                    <div
                        onClick={(e) => {
                            e.persist();
                            setSelected((currState) => ({
                                ...currState,
                                newMode: !currState.newMode,
                                editMode: false,
                            }));
                        }}
                        className="flex grid-cols-1 justify-end cursor-pointer">
                        {selected.newMode ? (
                            <Minus className={`h-6 w-6 text-${modeColor}-500 mt-4`} />
                        ) : (
                            <Plus className={`h-6 w-6 text-${modeColor}-500 mt-4`} />
                        )
                        }
                        <h3 className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${modeColor}`}>
                            New Feed
                        </h3>
                    </div>
                ) : null}

            </div>
            {(selected.editMode || selected.newMode) && user ? (
                <NewEditItem
                    type={ItemType.FeedType}
                />
            ) : null}
            <ItemList
                selected={selected}
                setSelected={setSelected}
                useSelected={true}
                type={ItemType.FeedType}
                allowEdits={true}
            />
        </Layout>
    )
}

export default FeedsPage;

const getModeColor = (newMode: boolean): string => newMode ? 'gray' : 'blue';
