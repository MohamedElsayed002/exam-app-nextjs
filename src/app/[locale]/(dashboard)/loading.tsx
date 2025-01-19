import { Loader } from "lucide-react";


const Loading = () => {
    return (
        <div className="min-h-full grid place-items-center">
            <span className="animate-spin">
                <Loader/>
            </span>
        </div>
    )
}

export default Loading;