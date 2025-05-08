import * as React from "react";

interface IStoriesProps {

}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {
    return <div className="flex justify-between">
        <img 
            // src={} 
            className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
        />
    </div>;
};

export default Stories;