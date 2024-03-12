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
    const priceRef = useRef()
    const global_context = useContext(GlobalContext)
    const [ModalCreate, setModalCreate] = useState(false)  // whether the modal is for create or update
    const [currentSelected, setCurrentSelected] = useState({})
    const { data:inventory, isError:isInventoryError, error:inventoryError, isLoading:isInventoryLoading, refetch } = useProducts({limit:10, offset:0})

    const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

    const CreateProduct=(e)=>{
        e.preventDefault()
        console.log(e)
        global_context.setLoading(true)
        const schema = z.object({
            name: z.string(),
            description: z.string(),
            price: z.coerce.number(),
        });
        const result = schema.safeParse({
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
        })
        console.log(result)

        if (!result.success) {
            const errorMsg = result.error.issues.map(item=>`${item.path[0]} - ${item.message} . \n`).join("")
            global_context.toast(errorMsg)
            return
        }

        if (!ModalCreate) {
            request(`/api/inventory/${currentSelected?.id}`, "PUT", {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
            }).then((result)=>{
                console.log("result111111111", result)
                global_context.toast("Product Updated")
                global_context.setLoading(false)
                closeCreateNewModal()
                refetch()
                return
            })
        } else {
            request(`/api/inventory`, "POST", {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
            }).then((result)=>{
                console.log("result222222", result)
                global_context.toast("Product Created")
                global_context.setLoading(false)
                closeCreateNewModal()
                refetch()
            })
        }

    }

  return (
    <>
      <div className="flex flex-row justify-between px-4 py-2">
        <button
          onClick={()=>{
            setModalCreate(true)
            openCreateNewModal()
          }}
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
                        <th>Price</th>
                        <th>Date</th>
                        <th className="small-td"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isInventoryLoading && inventory && inventory.map((value)=>{
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
                                <td>
                                    {value?.price}
                                </td>
                                <td>
                                    {value?.created_at}
                                </td>
                                <td className="small-td">
                                    <button onClick={()=>{
                                        setCurrentSelected({
                                            id: value?.id,
                                            name: value?.name,
                                            description: value?.description,
                                            price: value?.price
                                        })
                                        setModalCreate(false)
                                        openCreateNewModal()
                                    }}>Edit</button>
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
                        {ModalCreate ? <input type="text" id="product_name" ref={nameRef} /> :
                        <input type="text" id="product_name" ref={nameRef} defaultValue={currentSelected?.name} />}
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="description">Product Description: </label>
                    </td>
                    <td align="left">
                        {ModalCreate ? <textarea id="description" rows="5" ref={descriptionRef} ></textarea> :
                        <textarea id="description" rows="5" ref={descriptionRef} >{currentSelected?.description}</textarea> }
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label htmlFor="description">Price: </label>
                    </td>
                    <td align="left">
                        {ModalCreate ? <input type="number" id="price" ref={priceRef} step=".01" /> : 
                        <input type="number" id="price" ref={priceRef} step=".01" defaultValue={currentSelected?.price} /> }
                    </td>
                </tr>
            </table>
            {ModalCreate ? <button>Create</button> : <button>Update</button>}
        </form>
      </CreateNewModal>
    </>
  );
};
