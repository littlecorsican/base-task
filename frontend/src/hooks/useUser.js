import {
    useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/helpers'

const useUser = ({limit, offset}) => {
    console.log("offset2", offset)
    return useQuery({ 
        queryKey: ['user'],
        queryFn: async() => {
            console.log("offset3", offset)
            console.log(`/api/user?offset=${offset}&limit=${limit}`)
            const res = await request(`/api/user?offset=${offset}&limit=${limit}`, "GET", )
            return res?.data
        }
    });
}

export default useUser