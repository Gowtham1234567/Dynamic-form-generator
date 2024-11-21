import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>(''); // Store valid JSON

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side: JSON Editor */}
      <div className="w-full md:w-1/2 p-4 border-r">
        <JSONEditor setJsonSchema={setJsonSchema} />
      </div>
      {/* Right side: Form Preview */}
      <div className="w-full md:w-1/2 p-4">
        <FormPreview jsonSchema={jsonSchema} />
      </div>
    </div>
  );
};

export default App;
