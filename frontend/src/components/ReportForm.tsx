import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Camera, MapPin, Send, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportFormProps {
  onSubmit: () => void;
}

interface FormData {
  description: string;
  severity: 'urgent' | 'moderate' | 'low';
  location: string;
  photos: FileList;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Issue reported successfully! Our team will review it shortly.');
      reset();
      setPreviewImages([]);
      onSubmit();
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Camera className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Report Issue</h3>
            <p className="text-gray-600">Help improve Gurugram's roads</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Describe the pothole issue..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity *
          </label>
          <select
            {...register('severity', { required: 'Severity is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select severity</option>
            <option value="urgent">Urgent - Dangerous to vehicles</option>
            <option value="moderate">Moderate - Causes discomfort</option>
            <option value="low">Low - Minor issue</option>
          </select>
          {errors.severity && (
            <p className="mt-1 text-sm text-red-600">{errors.severity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('location', { required: 'Location is required' })}
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter location or landmark"
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
            <input
              {...register('photos')}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Click to upload photos</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
            </label>
          </div>
          
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {previewImages.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 px-4 rounded-md font-medium hover:from-orange-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Submit Report</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ReportForm;
