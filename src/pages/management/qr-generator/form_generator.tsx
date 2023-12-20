import InputField from '@/components/input_fields'
import QRCodeComponent from '@/components/qr_code'
import React, { useState } from 'react'

type Props = {}

const FormGenerator = (props: Props) => {

  const [data, setData] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = () => {
    setSubmitted(true)
  }

  const onClear = () => {
    setData('')
    setSubmitted(false)
  }

  return (
    <div className="flex flex-row items-start justify-between gap-8 w-full">
      <div className="flex flex-col gap-2">
        <InputField
          label='Input your data here'
          onChange={setData}
          value={data}
        />

        <div onClick={() => onSubmit()} className="cursor-pointer px-4 pt-2.5 pb-1.5 text-center w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <p>Submit</p>
        </div>
        <div onClick={() => onClear()} className="cursor-pointer px-4 pt-2.5 pb-1.5 text-center w-full bg-gray-400 text-white rounded-lg hover:bg-indigo-500">
          <p>Clear</p>
        </div>
      </div>
      {
        data !== '' && submitted && (
          <div className="flex-1">
          <QRCodeComponent data={data} />
          </div>
        )
      }
    </div>
  )
}

export default FormGenerator