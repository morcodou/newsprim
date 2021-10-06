import { ItemList, Layout } from "../components";
import { ItemType } from "../utils";


const Index = () => {
    return (
        <Layout>
            <h3 className="justify-start flex text-lg font-medim py-4">Home Page</h3>
            <ItemList type={ItemType.BundleType}></ItemList>
        </Layout>
    )
}

export default Index;