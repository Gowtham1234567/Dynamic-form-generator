import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormProps {
  jsonSchema: string;
}

const FormPreview: React.FC<FormProps> = ({ jsonSchema }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const parsedSchema = jsonSchema ? JSON.parse(jsonSchema) : {};

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
    
    // Reset form after submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">{parsedSchema.formTitle}</h2>
      <p className="mb-6 text-gray-500">{parsedSchema.formDescription}</p>

      {parsedSchema.fields?.map((field: any) => (
        <div key={field.id} className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type}
            {...register(field.id, { required: field.required })}
            placeholder={field.placeholder}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors[field.id] && <span className="text-red-500 mt-1">This field is required</span>}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;
