import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { ItemList, Layout, NewEditItem } from "../components";
import { Minus, Plus } from "../components/svg";
import { ItemType, SelectedFeedState } from "../utils";

const BundlesPage = () => {

    const { user, error, isLoading } = useUser();
    const initialSelected: SelectedFeedState = {
        id: null,
        feeds: [],
        editMode: false,
        newMode: false
    };

    const [selected, setSelected] = useState(initialSelected);
    const modeColor = getModeColor(selected.newMode);

    return (
        <Layout>
            <div className="grid grid-cols-2">
                <h3 className="grid-cols-1 justify-start flex text-lr font-medium py-4">Bundles Page</h3>
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
                            New Bundle
                        </h3>
                    </div>
                ) : null}
            </div>
            {(selected.editMode || selected.newMode) && user ? (
                <NewEditItem
                    type={ItemType.BundleType}
                />
            ) : null}
            <ItemList
                selected={selected}
                setSelected={setSelected}
                useSelected={true}
                type={ItemType.BundleType}
                allowEdits={true}
            />
        </Layout>
    )
}

export default BundlesPage;

const getModeColor = (newMode: boolean): string => newMode ? 'gray' : 'blue';

// {selected.newMode ? (
//     <Minus
//       className={`h-6 w-6 text-${
//         selected.newMode ? 'gray' : 'blue'
//       }-500 mt-4`}
//     />
//   ) : (
//     <Plus
//       className={`h-6 w-6 text-${
//         selected.newMode ? 'gray' : 'blue'
//       }-500 mt-4`}
//     />
//   )}