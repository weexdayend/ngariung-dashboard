interface InputFieldProps {
    label: string;
    value: string | '';
    onChange: (value: string | '') => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
    return (
      <div className="sm:col-span-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
          <input
            type="text"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  };
  
  export default InputField;