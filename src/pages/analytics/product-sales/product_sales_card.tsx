import React from 'react';

interface ProductSalesCardProps {
  // Add any necessary props for the card
}

const ProductSalesCard: React.FC<ProductSalesCardProps> = () => {
  // Dummy data for product sales
  const productSalesData = [
    { productName: 'Product A', revenue: 1000, unitsSold: 50 },
    { productName: 'Product B', revenue: 1500, unitsSold: 30 },
    { productName: 'Product C', revenue: 500, unitsSold: 20 },
    { productName: 'Product D', revenue: 500, unitsSold: 20 },
    { productName: 'Product E', revenue: 500, unitsSold: 20 },
    { productName: 'Product F', revenue: 500, unitsSold: 20 },
    { productName: 'Product G', revenue: 500, unitsSold: 20 },
    { productName: 'Product H', revenue: 500, unitsSold: 20 },
    { productName: 'Product I', revenue: 500, unitsSold: 20 },
    { productName: 'Product J', revenue: 500, unitsSold: 20 },
    { productName: 'Product K', revenue: 500, unitsSold: 20 },
    { productName: 'Product L', revenue: 500, unitsSold: 20 },
    { productName: 'Product O', revenue: 500, unitsSold: 20 },
    { productName: 'Product P', revenue: 500, unitsSold: 20 },
    { productName: 'Product Q', revenue: 500, unitsSold: 20 },
    { productName: 'Product R', revenue: 500, unitsSold: 20 },
    { productName: 'Product S', revenue: 500, unitsSold: 20 },
    { productName: 'Product T', revenue: 500, unitsSold: 20 },
    { productName: 'Product U', revenue: 500, unitsSold: 20 },
    { productName: 'Product V', revenue: 500, unitsSold: 20 },
    { productName: 'Product W', revenue: 500, unitsSold: 20 },
    { productName: 'Product X', revenue: 500, unitsSold: 20 },
    { productName: 'Product Y', revenue: 500, unitsSold: 20 },
    { productName: 'Product Z', revenue: 500, unitsSold: 20 },
    // Add more product sales data as needed
  ];

  return (
    <div className="w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <div className="card-content">
        <table className="table w-full text-left">
          <thead className='w-full'>
            <tr>
              <th className='font-semibold text-base'>Product Name</th>
              <th className='font-semibold text-base'>Revenue</th>
              <th className='font-semibold text-base'>Units Sold</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {productSalesData.map((product) => (
              <tr key={product.productName} className='border-b border-blue-950/20 h-12 last:border-0'>
                <td className='font-normal text-base'>{product.productName}</td>
                <td className='font-normal text-base'>{product.revenue}</td>
                <td className='font-normal text-base'>{product.unitsSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSalesCard;
