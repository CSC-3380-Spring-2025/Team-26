import * as React from 'react';
import Layout from '@/components/layout';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return (
    <Layout>
        <div>Home</div>
    </Layout>
    );
};

export default Home;