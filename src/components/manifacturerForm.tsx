import React, { useState } from "react";
import { Building, User, Phone, Mail, MapPin, Check } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { getTxn, registerVendor } from "../config/methods";
import { Dispatch, SetStateAction } from "react";

interface VendorRegistrationFormProps {
  setformLoader: Dispatch<SetStateAction<boolean>>;
}
export const VendorRegistrationForm: React.FC<VendorRegistrationFormProps> = ({
  setformLoader,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    number: "",
    email: "",
    venderCompanyAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    const { name, companyName, email, venderCompanyAddress, number } = formData;
    if (!name || !companyName || !email || !venderCompanyAddress || !number) {
      toast.error("⚠️ Please complete all fields before submitting.");
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    try {
      let resp = await registerVendor(formData);
      let txn = await getTxn(resp);
      if (!txn || !resp) {
        toast("Error while Transaction");
        setIsSubmitting(false);
      } else {
        toast("Trasaction sucessfull");
        setIsSuccess(true);
        setformLoader(true);
      }
    } catch (error) {
              setformLoader(false);

    }

    setFormData({
      name: "",
      companyName: "",
      number: "",
      email: "",
      venderCompanyAddress: "",
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-8">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-teal-500/30 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-400">
              Your vendor registration has been submitted successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 mb-8 border border-teal-500/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Vendor Registration
            </h1>
            <p className="text-gray-400">
              Register yourself as a verified vendor on our platform
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Vendor Information
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Company Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Building className="inline w-4 h-4 mr-2" />
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                placeholder="Enter your company name"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="number"
                name="number"
                required
                value={formData.number}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            {/* Company Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Company Address
              </label>
              <textarea
                name="venderCompanyAddress"
                required
                rows={3}
                value={formData.venderCompanyAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 resize-none"
                placeholder="Enter your company address"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Register as Vendor"
                )}
              </button>
            </div>

            {/* Terms */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-500">
                By registering, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
