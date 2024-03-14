import { useRef, useEffect, useState, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { GlobalContext } from "../App";
import '../css/inventory.css';
import useModal from '../hooks/useModal'
import useProducts from '../hooks/useInventory'
import { z } from "zod";
import { request, iSOToReadable } from '../utils/helpers'

export default function Inventory() {

    const nameRef = useRef()
    const descriptionRef = useRef()
    const priceRef = useRef()
    const findRef = useRef()
    const global_context = useContext(GlobalContext)
    const limit = 10
    const [offset, setOffset] = useState(0)
    const [sortBy, setSortBy] = useState("Date DESC")
    const [ModalCreate, setModalCreate] = useState(false)  // whether the modal is for create or update
    const [currentSelected, setCurrentSelected] = useState({})
    const { data:inventory, isError:isInventoryError, error:inventoryError, isLoading:isInventoryLoading, refetch } = useProducts({
        limit:limit,
        offset:offset,
        sortBy: sortBy
    })

    const options = [
        "Name ASC",
        "Name DESC",
        "Price ASC",
        "Price DESC",
        "Date ASC",
        "Date DESC",
    ]

    const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

    useEffect(()=>{
        refetch({limit:limit, offset:offset, sortBy: sortBy})
    },[offset, sortBy])

    const createProduct=(e)=>{
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
                global_context.setLoading(false)
                closeCreateNewModal()
                if (!result.success) {
                    global_context.toast(`Error, ${result?.message}`)
                } else {
                    global_context.toast("Product Updated")
                    refetch()
                }
            })
        } else {
            request(`/api/inventory`, "POST", {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
            }).then((result)=>{
                console.log("result222222", result)
                global_context.setLoading(false)
                closeCreateNewModal()
                if (!result.success) {
                    global_context.toast(`Error, ${result?.message}`)
                } else {
                    global_context.toast("Product Created")
                    refetch()
                }
            })
        }
    }

    const deleteProduct=(e, id)=>{
        e.preventDefault()
        const prompt = window.confirm("Are you really going to delete this?")
        if (!prompt) return
        global_context.setLoading(true)
        try {
            request(`/api/inventory/${id}`, "DELETE")
            .then((result)=>{
                console.log("result222222", result)
                global_context.setLoading(false)
                if (!result.success) {
                    global_context.toast(`Error, ${result?.message}`)
                } else {
                    global_context.toast("Product Deleted")
                    refetch()
                }
            })  
        } catch(e) {
            global_context.toast(`Error, ${e?.message}`)
        }

    }

    const handleChangeSelect=(e)=>{
        setSortBy(e.target.value)
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
            isInventoryError && <div>{inventoryError?.message}</div>
        }
        <div>
            <div className="my-2 py-1 flex flex-row">
                <div className="">
                    Find: <input type="text" ref={findRef} />
                </div>
                <div className="">
                    Sort by: <select defaultValue="Date DESC" onChange={handleChangeSelect}>
                        {
                            options.map((value)=>{
                                return<option value={value}>
                                    {value}
                                </option>
                            }) 
                        }
                    </select>
                </div>
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
                        <th className="small-td"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isInventoryLoading && !isInventoryError && inventory && inventory.map((value)=>{
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
                                    RM {value?.price}
                                </td>
                                <td>
                                    {iSOToReadable(value?.createdAt)}
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
                                <td className="small-td">
                                    <button onClick={(e)=>{
                                        deleteProduct(e, value?.id)
                                    }}>Delete</button>
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
      <CreateNewModal>
        <form onSubmit={createProduct}>
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
                        <label htmlFor="description">Price(RM): </label>
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
