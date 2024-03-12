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
                <h1>Stats</h1>
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Total Inventory Count: {dashboardStats}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>New Inventory Count Past 24 hours: {dashboardStats}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Most Expensive Inventory: {dashboardStats}</div>
                }
                {
                    !isDashboardStatsLoading && 
                    !isDashboardStatsError && 
                    <div>Cheapest Inventory: {dashboardStats}</div>
                }
            </div>
        </div>
    );
};
