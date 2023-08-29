import React, { useEffect, useState } from 'react'

import TableComponent from '@/components/table_component'
import PanelComponent from '../../../components/panel_component'
import FormTypeEvent from './form_type_event'

type Props = {
  data: any;
  onUpdated: () => void;
}

function TableTypeEvent({ data, onUpdated }: Props) {
  const [updated, setUpdated] = useState(false)
  
  useEffect(() => {
    if(updated){
      onUpdated()
      setUpdated(false)
    }
  }, [updated])

  const column = [
    '',
    'Event Type',
  ]

  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleClick = () => {
    setOpen(!open);
    setEditData(null)
  };

  const handleEdit = (item: any) => {
    setOpen(!open)
    setEditData(item)
  }

  const renderRow = (item: any) => {
    return(
      <>
        <td className='py-4 px-6 text-sm'>
          {item.status === false && (
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
              in-Active
            </span>
          )}
          {item.status === true && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          )}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>{item.nameType}</td>
        <td className='py-4 px-6'>
          <div onClick={() => handleEdit(item)} className='py-1 px-2 w-fit rounded-md bg-indigo-400 text-white text-sm font-normal cursor-pointer'>
            Edit
          </div>
        </td>
      </>
    )
  }

  const renderFilter = () => {
    return (
      <>
        <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
            onClick={() => handleClick()}
          >
            Add new outlet
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      {
        data && (<TableComponent columns={column} data={data.data} renderRow={renderRow} renderFilter={renderFilter()} />)
      }
      {open && (
        <PanelComponent setOpen={setOpen}>
          <FormTypeEvent onClose={() => setOpen(false)} onUpdated={() => setUpdated(true)} item={editData} />
        </PanelComponent>
      )}
    </>
  )
}

export default TableTypeEvent