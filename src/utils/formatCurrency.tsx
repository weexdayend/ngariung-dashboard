// Function to format the value into currency format
export const formatCurrency = (value: number | '') => {
  if(value === ''){
    return '';
  } else {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    const formattedValue = formatter.format(value);
    return formattedValue.replace('Rp', ''); // Remove the currency symbol
  }
};