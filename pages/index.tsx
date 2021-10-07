import { useState } from "react";
import { ItemList, Layout } from "../components";
import { ItemType, SelectedFeedState } from "../utils";


const IndexPage = () => {

    const initialSelected: SelectedFeedState = {
        id: null,
        feeds: [],
        editMode: false,
        newMode: false
    };

    const [selected, setSelected] = useState(initialSelected);

    return (
        <Layout>
            <h3 className="justify-start flex text-lg font-medim py-4">Home Page</h3>
            <ItemList
                selected={selected}
                setSelected={setSelected}
                useSelected={true}
                type={ItemType.BundleType}
                allowEdits={false}
            />
        </Layout>
    )
}

export default IndexPage;