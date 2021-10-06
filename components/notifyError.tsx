import { ErrorSign } from "./svg";


export const NotifyError = () => {
    return (
        <div className="h-sreen flex">
            <ErrorSign className="h-10 with-10 text-gray-500 m-auto" />
        </div>
    );
}