import { WaitingClock } from "./svg";


export const NotifyLoading = () => {
    return (
        <div className="h-sreen flex">
            <WaitingClock className="h-10 with-10 text-gray-500 m-auto" />
        </div>
    );
}