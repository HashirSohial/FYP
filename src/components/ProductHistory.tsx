import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Store,
  MapPin,
  Mail,
  DollarSign,
  Tag,
  Calendar,
  Hash,
  Building,
} from "lucide-react";
import { getProductAndVendorByCode } from "../config/methods";

interface ProductHistoryProps {
  bytecode?: string | null;
}

interface Product {
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  manufacturingDate: string;
  expiryDate: string;
  batchNumber: string;
}

interface Vendor {
  name: string;
  companyName: string;
  number: number;
  email: string;
  vendorCompanyAddress: string;
  isVerified: boolean;
  registrationDate: string;
}

interface VerificationData {
  isValid: boolean;
  vendor: Vendor | null;
  product: Product | null;
  blockchainHash: string;
  verificationCount: number;
  lastVerified: string;
}

export const ProductHistory: React.FC<ProductHistoryProps> = ({ bytecode }) => {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    isValid: false,
    vendor: null,
    product: null,
    blockchainHash: "No bytecode provided",
    verificationCount: 0,
    lastVerified: "Never",
  });
  
  const [loading, setLoading] = useState(true);
  const noBytecode = !bytecode || bytecode.trim() === "";

  useEffect(() => {
    const verifyBytecode = async (code: string | null) => {
      setLoading(true);
      
      // If no bytecode is provided
      if (!code || code.trim() === "") {
        setVerificationData({
          isValid: false,
          vendor: null,
          product: null,
          blockchainHash: "No bytecode provided",
          verificationCount: 0,
          lastVerified: "Never",
        });
        setLoading(false);
        return;
      }

      try {
        const resp = await getProductAndVendorByCode(code);
        
        // If response is invalid or error
        if (!resp || resp.length !== 2) {
          throw new Error("Invalid response format");
        }

        const [productData, vendorData] = resp;
        
        // Map product data
        const product: Product = {
          productName: productData.productName || 'Unknown',
          description: productData.description || 'No description',
          price: Number(productData.price) || 0,
          stock: Number(productData.stock) || 0,
          category: productData.category || 'General',
          manufacturingDate: productData.manufacturingDate || 'N/A',
          expiryDate: productData.expiryDate || 'N/A',
          batchNumber: productData.batchNumber || 'N/A',
        };

        // Map vendor data
        const vendor: Vendor = {
          name: vendorData.name || 'Unknown',
          companyName: vendorData.companyName || 'Unknown',
          number: Number(vendorData.venderNumber) || 0,
          email: vendorData.venderEmail || 'N/A',
          vendorCompanyAddress: vendorData.companyAddress || 'N/A',
          isVerified: true, // Assume verified if returned by contract
          registrationDate: vendorData.registrationDate || 'N/A',
        };

        setVerificationData({
          isValid: true,
          vendor,
          product,
          blockchainHash: code,
          verificationCount: 1, // Default count
          lastVerified: new Date().toISOString().split('T')[0],
        });
      } catch (error) {
        console.error("Verification failed", error);
        setVerificationData({
          isValid: false,
          vendor: null,
          product: null,
          blockchainHash: "Not found",
          verificationCount: 0,
          lastVerified: "Never",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyBytecode(bytecode || null);
  }, [bytecode]);

  if (loading && !noBytecode) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Verifying product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Product Verification
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Blockchain-based product authentication and vendor verification
            system
          </p>
        </div>

        {/* Bytecode Display */}
        {bytecode && (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Hash className="h-5 w-5 text-cyan-400 mr-2" />
              Product Bytecode
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-300 font-mono break-all">
                {bytecode}
              </p>
            </div>
          </div>
        )}

        {/* No Bytecode State */}
        {noBytecode && (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-12 text-center border border-gray-700 mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-gray-600/20 to-gray-700/20 w-32 h-32 rounded-full flex items-center justify-center">
                <Package className="h-20 w-20 text-gray-400" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4">
              NO PRODUCT TO VERIFY
            </h2>

            <p className="text-lg md:text-xl text-gray-500 mb-8">
              No product bytecode provided. Please scan a product or enter a
              valid bytecode to verify authenticity.
            </p>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center justify-center">
                <Hash className="h-5 w-5 text-gray-400 mr-2" />
                How to Get Started
              </h3>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="bg-gradient-to-br from-teal-600/10 to-emerald-600/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Hash className="h-6 w-6 text-teal-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    1. Get Bytecode
                  </h4>
                  <p className="text-xs text-gray-500">
                    Scan product QR code or barcode
                  </p>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-cyan-600/10 to-teal-600/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    2. Verify
                  </h4>
                  <p className="text-xs text-gray-500">
                    System checks blockchain records
                  </p>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    3. View Results
                  </h4>
                  <p className="text-xs text-gray-500">
                    Get detailed product information
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Verification Result */}
        {!noBytecode && (
          <div
            className={`rounded-lg shadow-xl p-8 text-center border-2 mb-8 ${
              verificationData.isValid
                ? "bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500"
                : "bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500"
            }`}
          >
            <div className="flex justify-center mb-6">
              {verificationData.isValid ? (
                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 w-32 h-32 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-20 w-20 text-emerald-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="bg-gradient-to-br from-red-600/30 to-orange-600/30 w-32 h-32 rounded-full flex items-center justify-center">
                    <XCircle className="h-20 w-20 text-red-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>

            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                verificationData.isValid ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {verificationData.isValid
                ? "AUTHENTIC PRODUCT"
                : "FRAUD DETECTED"}
            </h2>

            <p
              className={`text-lg md:text-xl ${
                verificationData.isValid ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {verificationData.isValid
                ? "Product and vendor have been successfully verified through blockchain records"
                : "This product could not be verified. Potential counterfeit or fraudulent item detected"}
            </p>
          </div>
        )}

        {verificationData.isValid &&
        verificationData.vendor &&
        verificationData.product ? (
          <div className="space-y-8">
            {/* Vendor Details */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Store className="h-6 w-6 text-teal-400 mr-3" />
                Vendor Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Vendor Name
                      </p>
                      <p className="text-lg text-white">
                        {verificationData.vendor.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Store className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Company Name
                      </p>
                      <p className="text-lg text-white">
                        {verificationData.vendor.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Hash className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Vendor ID
                      </p>
                      <p className="text-lg text-white">
                        {verificationData.vendor.number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Email</p>
                      <p className="text-lg text-white break-all">
                        {verificationData.vendor.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Company Address
                      </p>
                      <p className="text-lg text-white">
                        {verificationData.vendor.vendorCompanyAddress}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">
                    Verified Vendor
                  </span>
                  <span className="text-gray-400">
                    • Blockchain Authenticated
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Package className="h-6 w-6 text-emerald-400 mr-3" />
                Product Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      Product Name
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {verificationData.product.productName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      Description
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {verificationData.product.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Price
                        </p>
                        <p className="text-xl font-bold text-emerald-400">
                          ${verificationData.product.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-cyan-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Stock
                        </p>
                        <p className="text-lg text-white">
                          {verificationData.product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Tag className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Category
                      </p>
                      <span className="inline-block bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                        {verificationData.product.category}
                      </span>
                    </div>
                  </div>

                

               

               
                </div>
              </div>
            </div>

        
          </div>
        ) : !noBytecode ? (
          /* Fraud Detection Warning */
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-2 border-orange-500 rounded-lg p-8">
            <div className="text-center mb-6">
              <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-orange-400 mb-4">
                Fraud Detection Alert
              </h3>
              <p className="text-orange-300 text-lg mb-6">
                This product could not be verified through our blockchain
                network. This may indicate a counterfeit or fraudulent item.
              </p>
            </div>

            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                What this means:
              </h4>
              <ul className="text-red-300 space-y-2 ml-4">
                <li>• Product is not registered in our blockchain network</li>
                <li>• Vendor information could not be verified</li>
                <li>• High probability of counterfeit or fraudulent item</li>
                <li>• Product may not meet safety or quality standards</li>
              </ul>
            </div>

            <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Recommended Actions:
              </h4>
              <ul className="text-orange-300 space-y-2 ml-4">
                <li>• Do not use or consume this product</li>
                <li>• Contact the seller/retailer for a refund</li>
                <li>
                  • Report this incident to consumer protection authorities
                </li>
                <li>• Consider purchasing from verified vendors only</li>
                <li>• Share this information to protect other consumers</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};