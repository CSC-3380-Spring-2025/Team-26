import Layout from '@/components/layout';
import { useUserAuth } from '@/context/userAuthContext';
import { getPostByUserId } from '@/repository/post.service';
import { DocumentResponse, Post } from '@/types';
import * as React from 'react';

interface IMyPhotosProps {
}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (props) => {

    const { user } = useUserAuth()
    const [date, setData ] = React.useState<DocumentResponse[]>([]);

    const getAllPost = async (id:string) => {
        try {
            const querySnapshot = await getPostByUserId(id);
            const tempArr: DocumentResponse[] = [];
            if(querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Post;
                    const responseObj: DocumentResponse = {
                        id: doc.id,
                        ...data
                    }
                    console.log("The response object is : ", responseObj);
                    tempArr.push(responseObj);
                });
                setData(tempArr);
            } else {
                console.log("No such document");
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (user) {
          getAllPost(user.uid);
        }
      }, [user]);

    return (
    <Layout>
        <div>My Posts</div>
    </Layout>
    );
};

export default MyPhotos;