import { useRef, useEffect, useState, useContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'
import '../css/container.css';
import useModal from '../hooks/useModal'

export default function Container() {

  const global_context = useContext(GlobalContext)
  const { data:containers, isError:isContainerError, error:containerError, isLoading:isContainerLoading } = useQuery({ 
      queryKey: ['containers'],
      queryFn: async() => {
          global_context.setLoading(true)
          const res = await request(`/api/container`, "GET", )
          global_context.setLoading(false)
          return res?.data
      }
  });

  const { openModal:openCreateNewModal, Modal:CreateNewModal, closeModal:closeCreateNewModal } = useModal();

  return (
    <>
      <div className="flex flex-row justify-between px-4 py-2">
        <button
          onClick={openCreateNewModal}
        >
          Create New Container
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div>
        
        </div>
      </div>
      <CreateNewModal>
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
      </CreateNewModal>
    </>
  );
};
