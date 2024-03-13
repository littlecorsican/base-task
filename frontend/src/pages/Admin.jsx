import { useRef, useEffect, useState, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'
import useUser from '../hooks/useUser'
import '../css/inventory.css';
import useModal from '../hooks/useModal'
import { z } from "zod";

export default function Admin() {

    const global_context = useContext(GlobalContext)
    const { data:users,
        isError:isUsersError,
        error:usersError,
        isLoading:isUserLoading,
        refetch
    } = useUser({limit:10, offset:0})

    const handleGrant=(id)=>{
        global_context.setLoading(true)
        request(`/api/user/grantpermission/${id}`, "POST", {
            permissions: [
                5,6
            ]
        }).then((result)=>{
            console.log("result", result)
            global_context.setLoading(false)
            if (!result.success) {
                global_context.toast(`Error, ${result?.message}`)
            } else {
                global_context.toast("Admin priviledge granted")
                refetch()
            }
        })
    }

    const removeAdmin=(id)=>{
        global_context.setLoading(true)
        request(`/api/user/removepermission/${id}`, "POST", {
            permissions: [
                5,6
            ]
        }).then((result)=>{
            console.log("result", result)
            global_context.setLoading(false)
            if (!result.success) {
                global_context.toast(`Error, ${result?.message}`)
            } else {
                global_context.toast("Admin priviledge removed")
                refetch()
            }
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1>Users</h1>
                <div className="">
                    {
                        isUserLoading && <div>User list is loading....</div>
                    }
                    {
                        isUsersError && <div>{usersError}</div>
                    }
                    <div>
                        <div>
                            Filter
                        </div>
                        <table border="1" className="bordered-table">
                            <thead>
                                <tr>
                                    <th className="small-td">ID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !isUserLoading && users.map((value)=>{
                                        return<tr key={value?.id}>
                                            <td className="small-td">
                                                {value?.id}
                                            </td>
                                            <td>
                                                {value?.email}
                                            </td>
                                            <td>
                                                {value?.name}
                                            </td>
                                            <td>
                                                <button onClick={()=>handleGrant(value?.id)}>Grant Admin Priviledge</button>
                                                <button onClick={()=>removeAdmin(value?.id)}>Remove Admin Priviledge</button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
