import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IPostCardProps {
    data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({data}) => {

    const {user} = useUserAuth();
    return(
        <Card className="mb-6">
            <CardHeader className="flex flex-col p-3">
                <CardTitle className="text-sm text-center flex justify-start items-center"></CardTitle>
                <span className="mr-2">
                    <img className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
                    // img src={} need shii in it
                    />
                </span>
                <span>Guest_user</span>
            </CardHeader>
            <CardContent className="p-0">
                <img src={data.photos ? data.photos[0].cdnUrl : ""} />
            </CardContent>
            <CardFooter className="flex flex-col p-3">
                <div className="flex justify-between w-full mb-3">
                    <HeartIcon className={cn( "mr-3", "cursor-pointer",)} />
                    <MessageCircle className="mr-3" />
                </div>
                <div className="w-full text-sm">{0} likes</div>
                <div className="w-full text-sm">
                    <span>Guest_user</span>: {data.caption}
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostCard;