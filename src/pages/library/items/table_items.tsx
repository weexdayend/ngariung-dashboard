import React, { useEffect, useState } from 'react'

import TableComponent from '@/components/table_component'
import PanelComponent from '../../../components/panel_component'
import FormItems from './form_items'
import { formatCurrency } from '@/utils/formatCurrency'

type Props = {
  data: any;
  filter: any;
  category: any;
  onUpdated: () => void;
}

function TableItems({ data, filter, category, onUpdated }: Props) {
  const [updated, setUpdated] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [selectFilter, setSelectFilter] = useState('ALL')

  useEffect(() => {
    if (updated) {
      onUpdated();
      setUpdated(false);
    }
  }, [updated, onUpdated]);

  useEffect(() => {
    if (data && selectFilter === 'ALL') {
      // If the filter is set to 'ALL', show all data
      setFilteredData(data.data);
    } else {
      // Filter the data based on the selected filter
      const filtered = data.data.filter((item: any) => item.categoryName === selectFilter);
      setFilteredData(filtered);
    }
  }, [selectFilter, data]);

  const column = [
    '',
    'Name',
    'Category',
    'Price',
    '',
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
        <td className='py-3 px-3 text-sm'>
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
        <td className='py-3 px-3 text-sm font-bold'>{item.productName}</td>
        <td className='py-3 px-3 text-sm'>
          <span className="text-sm text-indigo-700">
            {`${item.categoryName}`}
          </span>
        </td>
        <td className='py-3 px-3 text-sm'>{formatCurrency(item.prices)}</td>
        <td className='py-3 px-3'>
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
        <div className='flex flex-row items-center overflow-hidden flex-wrap gap-2 my-4'>
          <div
            onClick={() => setSelectFilter('ALL')}
            className={`flex flex-row items-center w-fit px-3 py-2 cursor-pointer rounded-full ${
              selectFilter === 'ALL' 
                ? 'bg-gradient-to-r from-indigo-400 to-rose-400'
                : 'bg-gray-400'
            }`}
          >
            <p className="text-white font-bold text-xs ml-1 pr-1">ALL</p>
          </div>
          {filter.map((item: any, i: any) => (
            <div
              key={i+1}
              onClick={() => setSelectFilter(item.uniqueName)}
              className={`flex flex-row items-center w-fit px-3 py-2 cursor-pointer rounded-full ${
                item.uniqueName === selectFilter
                  ? 'bg-gradient-to-r from-indigo-400 to-rose-400'
                  : 'bg-gray-400'
              }`}
            >
              <p className="text-white font-bold text-xs ml-1 pr-1">{item.uniqueName}</p>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
    {
      data && (<TableComponent columns={column} data={filteredData} renderRow={renderRow} renderFilter={renderFilter()} />)
    }
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormItems onClose={() => setOpen(false)} onUpdated={() => setUpdated(true)} item={editData} category={category} />
      </PanelComponent>
    )}
    </>
  )
}

export default TableItems