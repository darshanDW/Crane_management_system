import { useState } from 'react';
import axios from 'axios';

export default function CraneForm({ crane, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    craneNumber: crane?.craneNumber || '',
    type: crane?.type || '',
    capacity: crane?.capacity || '',
    hourlyRate: crane?.hourlyRate || '',
    status: crane?.status || 'available',
    imageUrl: crane?.imageUrl || "",
    imagePublicId: crane?.imagePublicId || "",
    documentUrl: crane?.documentUrl || "",
    documentPublicId: crane?.documentPublicId || "",
  });


  const [imageFile, setImageFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loader


  const uploadToCloudinary = async (file, resourceType) => {
    const cloudinaryConfig = {
      upload_preset: "ml_default", // Replace with your Cloudinary preset
      cloud_name: "doavaeyri", // Replace with your Cloudinary cloud name
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.upload_preset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/${resourceType}/upload`,
        formData
      );
      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error(`Cloudinary upload failed${error}`);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      let imageUrl = formData.imageUrl;
      let imagePublicId = formData.imagePublicId;
      let documentUrl = formData.documentUrl;
      let documentPublicId = formData.documentPublicId;
      // Upload image if selected
      if (imageFile) {
        const imageUpload = await uploadToCloudinary(imageFile, "image");
        imageUrl = imageUpload.url;
        imagePublicId = imageUpload.publicId;
      }

      // Upload document if selected
      if (documentFile) {
        const documentUpload = await uploadToCloudinary(documentFile, "raw");
        documentUrl = documentUpload.url;
        documentPublicId = documentUpload.publicId;
      }

      // Prepare data for backend
      const dataToSend = {
        ...formData,
        imageUrl,
        imagePublicId,
        documentUrl,
        documentPublicId,
      };

      if (crane) {
        await axios.put(`${import.meta.env.VITE_API_URL}api/cranes/${crane._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}api/cranes`, dataToSend);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving crane:', error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Crane Number</label>
        <input
          type="text"
          value={formData.craneNumber}
          onChange={(e) => setFormData({ ...formData, craneNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Capacity (tons)</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
        <input
          type="number"
          value={formData.hourlyRate}
          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Crane Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Crane Document</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setDocumentFile(e.target.files[0])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading} // Disable button while loading

          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {loading ? "Processing..." : crane ? "Update" : "Create"} Crane
        </button>
      </div>
    </form>
  );
}