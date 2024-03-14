import {
    useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/helpers'

const useUser = ({limit, offset}) => {
    return useQuery({ 
        queryKey: ['user'],
        queryFn: async() => {
            const res = await request(`/api/user?offset=${offset}&limit=${limit}`, "GET", )
            return res?.data
        }
    });
}

export default useUser