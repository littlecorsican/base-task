import { useEffect, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'

export default function Dashboard() {

    const global_context = useContext(GlobalContext)
    const { data:dashboardStats, isError:isDashboardStatsError, error:dashBoardStatsError, isLoading:isDashboardStatsLoading } = useQuery({ 
        queryKey: ['dashboardStats'],
        queryFn: async() => {
            global_context.setLoading(true)
            const res = await request(`/api/dashboard/count`, "GET", )
            global_context.setLoading(false)
            return res?.data
        }
    });

    useEffect(()=>{
        
    },[])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1>Stats</h1>
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Total Inventory Count: {dashboardStats?.query1}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Most Expensive Inventory: RM {dashboardStats?.query2}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Cheapest Inventory: RM {dashboardStats?.query3}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>New Inventory Added in Past 24 hours: {dashboardStats?.query4}</div>
                }
            </div>
        </div>
    );
};
