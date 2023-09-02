import React, { useEffect, useState } from 'react'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '../../../components/input_fields';
import SwitchButton from '@/components/switch_button';

import axios from 'axios';
import ListDropdown from '@/components/list_dropdown';
import NumberField from '@/components/number_fields';

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  item: any;
  category: any;
}

function FormItems({ onClose, onUpdated, item, category }: Props) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState({ id: '', name: '' })
  const [status, setStatus] = useState(false);

  const [enabled, setEnabled] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  const [transformCategory, setTrasnformCategory] = useState([])

  useEffect(() => {
    if (item) {
      setProductName(item.productName || '');
      setProductPrice(item.prices || 0);
      setProductCategory({ id: item.categoryId, name: item.categoryName} || { id: '', name: '' });
      setStatus(item.status || false)

      const transform = category && category.data.map((item: any) => ({
        id: item.id,
        name: item.categoryName
      }))
      setTrasnformCategory(transform)

      if(item.status == 1){
        setEnabled(true)
      }else{
        setEnabled(false)
      }
    }
  }, []);

  useEffect(() => {
    if(item){
      const hasDataChanged =
        item.productName !== productName ||
        item.productPrice !== productPrice ||
        item.productCategory !== productCategory.name ||
        item.status !== status;

      setDataChanged(hasDataChanged);
    }
  }, [productName, productPrice, productCategory, status])


  const isAnyFieldEmpty = !productName || !productPrice

  useEffect(() => {
    if (enabled) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [enabled]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const endpoint = newData ? `${process.env.API_URL}products/register` : `${process.env.API_URL}products/update`;
    
    const body: any = {
      productName,
      productCategory: productCategory.id,
      productPrice,
    };
  
    if (!newData) {
      body['id'] = item.id;
      body['status'] = status
    }

    const responsePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(endpoint, body)
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(
      responsePromise, // Resolve with the response data
      {
        loading: 'Updating your data...',
        success: (response: any) => {
          setTimeout(() => {
            onClose();
            onUpdated();
          }, 1500);
          return response.message;
        },
        error: (e: any) => {
          return e.response?.data?.error
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(90deg, #4f46e5 0%, #fb7185 100%)', // Green gradient
              color: '#fff'
            },
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Event Type Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your event type.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Product name" value={productName} onChange={setProductName} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Product categoroy" value={productCategory} onChange={setProductCategory} holder={'Choose your category'} options={transformCategory} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <NumberField label="Product price" value={productPrice} onChange={setProductPrice} />
                </div>
              </div>
            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12">      
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation outlet" enabled={enabled} onChange={setEnabled} />
                </div>
              </div>
            )
          }
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            onClick={onClose}
            type="button" 
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {
            newData ? (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isAnyFieldEmpty}
              >
                Save data
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!dataChanged}
              >
                Update data
              </button>
            )
          }
        </div>
      </form>
    </React.Fragment>
  )
}

export default FormItems