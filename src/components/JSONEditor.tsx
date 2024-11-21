import React, { useState } from 'react';
import Ajv from 'ajv';

interface JSONEditorProps {
  setJsonSchema: React.Dispatch<React.SetStateAction<string>>;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ setJsonSchema }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // AJV instance for validation
  const ajv = new Ajv();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedJson = e.target.value;
    setJsonInput(updatedJson);
    
    try {
      const parsedJson = JSON.parse(updatedJson);
      
      const schema = {
        type: "object",
        properties: {
          formTitle: { type: "string" },
          formDescription: { type: "string" },
          fields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                label: { type: "string" },
                type: { type: "string" }
              },
              required: ["id", "label", "type"]
            }
          }
        },
        required: ["formTitle", "fields"]
      };

      const validate = ajv.compile(schema);
      const valid = validate(parsedJson);

      if (valid) {
        setError(null);
        setJsonSchema(updatedJson);
      } else {
        setError('Invalid JSON schema');
      }
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <textarea
        className="w-full h-3/5 p-4 border rounded-md"
        value={jsonInput}
        onChange={handleChange}
        placeholder="Paste your JSON schema here..."
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default JSONEditor;
