import React from 'react'

interface TableProps {
  data: any[]; // Array of data to populate the table
  columns: string[]; // Array of column names
  renderRow: (item: any) => JSX.Element; // Function to render each row
  renderFilter: JSX.Element; // Function to render Filter Section or Button
}

const TableComponent: React.FC<TableProps> = ({ data, columns, renderRow, renderFilter }) => {
  return (
    <div className='row-span-1 w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      {renderFilter}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column+1} className="py-3 px-3">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
          {data.map((item) => (
            <tr key={item.id+1} className='w-full flex py-3 px-3'>{renderRow(item)}</tr>
          ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent