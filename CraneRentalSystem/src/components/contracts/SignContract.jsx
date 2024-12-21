import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

export default  function SignContract() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sigPad, setSigPad] = useState(null);

  const handleSign = async () => {
    if (sigPad.isEmpty()) {
      alert('Please provide a signature');
      return;
    }

    try {
      const signatureData = sigPad.toDataURL();
      await axios.post(`${import.meta.env.VITE_API_URL}api/contracts/${id}/sign`, {
        signatureData
      });
      navigate('/quotes');
    } catch (error) {
      console.error('Error signing contract:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sign Contract</h2>
      <div className="border rounded-lg p-4 mb-4">
        <SignatureCanvas
          ref={(ref) => setSigPad(ref)}
          canvasProps={{
            className: 'signature-canvas w-full h-64 border rounded',
          }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => sigPad.clear()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear
        </button>
        <button
          onClick={handleSign}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Signature
        </button>
      </div>
    </div>
  );
}