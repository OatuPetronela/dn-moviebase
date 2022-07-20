import Layout from "../components/Layout";
import {fetcher} from '../utils/api';
import useSWR, {useSWRConfig} from 'swr';
import {
    Heading,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    IconButton,
    Tooltip,
    Table,
    Link,
} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import {StarIcon} from '@chakra-ui/icons';

function Watchlist() {

    const {mutate} = useSWRConfig();
    const {data} = useSWR(`http://localhost:3000/api/watchlist/list`);

    mutate(`http://localhost:3000/api/watchlist/list`, () => fetcher(`http://localhost:3000/api/watchlist/list`));

    const handleDelete = async(id) => {
        await fetcher(`http://localhost:3000/api/watchlist/${id}`, {method: 'DELETE'});
        mutate(`http://localhost:3000/api/watchlist/list`);
    }

    const getStarRating = (rating) => {
        const starRating = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            starRating.push(<StarIcon key={i} color="yellow.500"/>);
        }
        if (rating % 1 >= 0.5) {
            starRating.push(<StarIcon key={Math.floor(rating)} color="yellow.500"/>);
        }
        return starRating;
    }

    return (
        <Layout>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr >
                            <Th pl='12'>Title</Th>
                            <Th >Date</Th>
                            <Th>Rating</Th>
                            <Th>Remove from watchlist</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data
                            .response
                            .map(({id, title, date, rating}) => (
                                <Tr key={id}>
                                    <Td>
                                        <Link href={`/movies/${id}`} fontWeight='semibold' pl='20' passHref>
                                            <Heading fontSize='lg'>{title}</Heading>
                                        </Link>
                                    </Td>
                                    <Td >{date}</Td>
                                    <Td>{getStarRating(rating)} {rating}</Td>
                                    <Td pl='20'>
                                        <Tooltip label="Delete">
                                            <IconButton
                                                isLoading={!data}
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => {
                                                handleDelete(id);
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Layout>
    )
}

export default Watchlist;