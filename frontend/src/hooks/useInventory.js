import {
    useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/helpers'

const useProducts = ({limit, offset, sortBy, contains}) => {
    return useQuery({ 
        queryKey: ['inventory'],
        queryFn: async() => {
            const res = await request(`/api/inventory?offset=${offset}&limit=${limit}&sortBy=${sortBy}&contains=${contains}`, "GET", )
            return res?.data
        }
    });
}

export default useProducts