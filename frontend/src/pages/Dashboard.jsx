import { useRef, useEffect, useState, useContext } from "react";
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
            const res = await request(`/api/dashboard`, "GET", )
            global_context.setLoading(false)
            return res?.data
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                {
                    !isDashboardStatsLoading && !isDashboardStatsError && <div>Inventory Count: {dashboardStats}</div>
                }
                {
                    !isDashboardStatsLoading && !isDashboardStatsError && <div>Container Count: {dashboardStats}</div>
                }
            </div>
        </div>
    );
};
