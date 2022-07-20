import Layout from '../components/Layout';
import {Heading, Center} from '@chakra-ui/react';

function Watchlist() {

    return (
        <Layout title="Search">
            <Center>
                <Heading as='h2'>Your history</Heading>
            </Center>
        </Layout>
    );
}
export default Watchlist;