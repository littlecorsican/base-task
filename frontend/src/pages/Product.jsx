import { useRef, useEffect, useState, useContext } from "react";
import { request, iSOToReadable } from '../utils/helpers'
import { GlobalContext } from "../App";
import '../css/inventory.css';
import useProduct from '../hooks/useProduct'
//use useParams 
import { useParams } from 'react-router-dom';


export default function Product() {

    const global_context = useContext(GlobalContext)
    const params = useParams()
    const id = params.id

    const { data:product, isError:isProductError, error:productError, isLoading:isProductLoading, refetch } = useProduct(id)

  return (
    <>
        {
            isProductLoading && <div>Product details is loading....</div>
        }
        {
            isProductError && <div>{productError?.message}</div>
        }
        
        <table border="1" className="bordered-table">
            <thead>
                <tr>
                    <th className="small-td">ID</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Price</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    product === null && <tr> <td colspan="5" className="text-center">PRODUCT DO NOT EXISTS </td></tr>
                }
                {
                    !isProductLoading && !isProductError && product && <tr>
                        <td className="small-td">
                            {product?.id}
                        </td>
                        <td>
                            {product?.name}
                        </td>
                        <td>
                            {product?.description}
                        </td>
                        <td>
                            RM {product?.price}
                        </td>
                        <td>
                            {iSOToReadable(product?.createdAt)}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </>
  );
};
