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
        isLoading:isUserLoading
    } = useUser({limit:10, offset:0})


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
                                    <th>Product Name</th>
                                    <th>Product Description</th>
                                    <th className="small-td"></th>
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
                                                {value?.name}
                                            </td>
                                            <td>
                                                {value?.description}
                                            </td>
                                            <td className="small-td">
                                                <button>Edit</button>
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
