import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'
import useUser from '../hooks/useUser'
import '../css/inventory.css';
import { permissions } from '../enums/permissions'

export default function Admin() {

    const global_context = useContext(GlobalContext)
    const limit = 10
    const [offset, setOffset] = useState(0)


    const { data:users,
        isError:isUsersError,
        error:usersError,
        isLoading:isUserLoading,
        refetch
    } = useUser({limit:limit, offset:offset})

    useEffect(()=>{
        refetch({limit:limit, offset:offset})
    },[offset])

    const handleGrant=(id, permission)=>{
        global_context.setLoading(true)
        try {
            request(`/api/user/grantpermission/${id}`, "POST", {
                permission
            }).then((result)=>{
                global_context.setLoading(false)
                if (!result.success) {
                    global_context.toast(`Error, ${result?.message}`)
                } else {
                    global_context.toast("Priviledge granted")
                    refetch()
                }
            })
        } catch {
            global_context.setLoading(false)
            global_context.toast("Error")
        }
    }

    const removeAdmin=(id, permission)=>{
        global_context.setLoading(true)
        try {
        request(`/api/user/removepermission/${id}`, "POST", {
            permission
        }).then((result)=>{
            global_context.setLoading(false)
            if (!result.success) {
                global_context.toast(`Error, ${result?.message}`)
            } else {
                global_context.toast("Priviledge removed")
                refetch()
            }
        })
        } catch(e) {
            global_context.setLoading(false)
            global_context.toast("Error")
        }
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
                        isUsersError && <div>{usersError?.message}</div>
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
                                    !isUserLoading && !isUsersError && users && users.map((value)=>{
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
                                            <td className="flex flex-col">
                                                {
                                                    Object.keys(permissions).map((permission)=>{
                                                        if (value?.user_permission.find((user_permission)=>user_permission?.permission?.name === permission)) {
                                                            return <button onClick={()=>removeAdmin(value?.id, permission)} key={permission}>
                                                                Remove {permissions[permission]} Priviledge
                                                            </button>
                                                        }
                                                        return <button onClick={()=>handleGrant(value?.id, permission)} key={permission}>
                                                            Grant {permissions[permission]} Priviledge
                                                        </button>
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        {/* PAGINATION */}
                        <div className="flex flex-row justify-around my-2">
                            <div>
                                Page: {offset/limit+1}
                            </div>
                            <div>
                                Rows Per Page:{limit}
                            </div>
                            <div>
                                <button onClick={()=>{
                                    if (offset === 0) return
                                    setOffset((offset)=>offset-limit)
                                }}> Back </button>
                                <button onClick={()=>{
                                    setOffset((offset)=>offset+limit)
                                }}> Next </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
