import {
    useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/helpers'

const useProduct = (id) => {
    return useQuery({ 
        queryKey: ['product'],
        queryFn: async() => {
            const res = await request(`/api/inventory/${id}`, "GET", )
            return res?.data
        }
    });
}

export default useProduct