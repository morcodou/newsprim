import { useState } from "react";
import { ItemList, Layout } from "../components";
import { ItemType, SelectedFeedState } from "../utils";


const BundlesPage = () => {

    const initialSelected: SelectedFeedState = {
        id: null,
        feeds: [],
        editMode: false,
        newMode: false
    };

    const [selected, setSelected] = useState(initialSelected);

    return (
        <Layout>
            <div className="grid grid-cols-2">
                <h3 className="grid-cols-1 justify-start flex text-lr font-medium py-4">Bundles Page</h3>
            </div>

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