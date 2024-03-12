import { useRef, useEffect, useState, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { GlobalContext } from "../App";
import '../css/inventory.css';
import useModal from '../hooks/useModal'
import useProducts from '../hooks/useInventory'
import { z } from "zod";
import { request } from '../utils/helpers'

export default function Inventory() {

    const nameRef = useRef()
    const descriptionRef = useRef()
    const global_context = useContext(GlobalContext)
    const { data:inventory, isError:isInventoryError, error:inventoryError, isLoading:isInventoryLoading } = useProducts({limit:10, offset:0})

    const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

    const CreateProduct=(e)=>{
        e.preventDefault()
        console.log(e)
        global_context.setLoading(true)
        const schema = z.object({
            name: z.string(),
            description: z.string(),
        });
        const result = schema.safeParse({
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        })
        console.log(result)

        if (!result.success) {
            const errorMsg = result.error.issues.map(item=>`${item.path[0]} - ${item.message} . \n`).join("")
            global_context.toast(errorMsg)
            return
        }

        request(`/api/inventory`, "POST", {
            name: nameRef.current.value,
            description: descriptionRef.current.value
        }).then((result)=>{
            console.log("result", result)
            global_context.setLoading(false)
        })

    }

  return (
    <>
      <div className="flex flex-row justify-between px-4 py-2">
        <button
          onClick={openCreateNewModal}
        >
          Create New Inventory
        </button>
      </div>
      <div className="">
        {
            isInventoryLoading && <div>Inventory list is loading....</div>
        }
        {
            isInventoryError && <div>{inventoryError}</div>
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
                        !isInventoryLoading && inventory.map((value)=>{
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
      <CreateNewModal>
        <form onSubmit={CreateProduct}>
            <table>
                <tr>
                    <td align="right">
                        <label htmlFor="product_name">Product Name: </label>
                    </td>
                    <td align="left">
                        <input type="text" id="product_name" ref={nameRef} />
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="description">Product Description: </label>
                    </td>
                    <td align="left">
                        <textarea id="description" rows="5" ref={descriptionRef} ></textarea>
                    </td>
                </tr>
                {/* <tr>
                    <td align="right">Email:</td>
                    <td align="left"><input type="text" name="email" /></td>
                </tr> */}
            </table>
            <button>Create</button>
        </form>
      </CreateNewModal>
    </>
  );
};
