import React, { useEffect, useState } from "react";
import {
  Store,
  Package,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Tag,
  Search,
  Filter,
  ChevronDown,
  Building,
} from "lucide-react";
import { totalProductsOfVender, totalVenderDetails } from "../config/methods";
import { QRCodeSVG } from "qrcode.react";

interface Product {
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  bytecode: string;
}

interface Vendor {
  name: string;
  companyName: string;
  number: number;
  email: string;
  vendorCompanyAddress: string;
  products: Product[];
}

export const VendorProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrcodeData, setQrcodeData] = useState("");
  // Mock data for vendors and their products
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const totalVenders = async () => {
    try {
      const resp = await totalVenderDetails(); // get all vendors

      const formattedVendors: Vendor[] = [];

      for (let i = 0; i < resp.length; i++) {
        const vendor = resp[i];
        const vendorAddress = vendor.vendorAddress as string;

        try {
          const rawProducts = await totalProductsOfVender(vendorAddress);
          console.log(rawProducts);

          const products: Product[] = rawProducts.map((p: any) => ({
            productName: p.productName,
            description: p.description,
            price: Number(p.price),
            stock: Number(p.stock),
            category: p.category,
            bytecode: p.productCode,
          }));

          formattedVendors.push({
            name: vendor.name,
            companyName: vendor.companyName,
            number: Number(vendor.venderNumber),
            email: vendor.venderEmail,
            vendorCompanyAddress: vendor.companyAddress,
            products,
          });
        } catch (error) {
          console.log("Error while getting products for", vendorAddress, error);
        }
      }

      setVendors(formattedVendors);
    } catch (error) {
      console.log("Error while getting vendors", error);
    }
  };

  useEffect(() => {
    totalVenders();
  }, []);

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.products.some(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All Categories" ||
      vendor.products.some((product) => product.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const toggleVendorExpansion = (vendorNumber: number) => {
    setExpandedVendor(expandedVendor === vendorNumber ? null : vendorNumber);
  };
 const openQrcode = (bytecode: string) => {
  const origin = window.location.origin; 
  const fullUrl = `${origin}/?bytecode=${encodeURIComponent(bytecode)}`;
  setQrcodeData(fullUrl);
  setIsModalOpen(true);
};
  return (
    <>
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white text-black rounded-xl shadow-lg p-6 w-96 max-w-full relative flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Bytecode QR Code</h2>

      <QRCodeSVG value={qrcodeData} size={200} />

      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
      >
        &times;
      </button>
    </div>
  </div>
)}



      <div className="min-h-screen bg-black py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vendor & Products Directory
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse through our verified vendors and their authentic products.
              All vendors are blockchain-verified for your security.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors, companies, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Category Filter
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 appearance-none min-w-48"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div> */}
            </div>
          </div>

          {/* Stats Bar */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 rounded-lg p-4 text-center border border-teal-500/30">
            <Store className="h-8 w-8 text-teal-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{filteredVendors.length}</p>
            <p className="text-sm text-gray-400">Vendors</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg p-4 text-center border border-emerald-500/30">
            <Package className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{filteredVendors.reduce((acc, vendor) => acc + vendor.products.length, 0)}</p>
            <p className="text-sm text-gray-400">Products</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 rounded-lg p-4 text-center border border-cyan-500/30">
            <Tag className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{categories.length - 1}</p>
            <p className="text-sm text-gray-400">Categories</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-teal-600/20 rounded-lg p-4 text-center border border-purple-500/30">
            <Building className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-gray-400">Verified</p>
          </div>
        </div> */}

          {/* Vendors List */}
          <div className="space-y-6">
            {filteredVendors.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-12 text-center border border-gray-700">
                <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No vendors found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or filters
                </p>
              </div>
            ) : (
              filteredVendors.map((vendor) => (
                <div
                  key={vendor.number}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl border border-gray-700 overflow-hidden"
                >
                  {/* Vendor Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-800/50 transition-colors duration-200"
                    onClick={() => toggleVendorExpansion(vendor.number)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start space-x-4 mb-4 md:mb-0">
                        <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                          <Store className="h-8 w-8 text-teal-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1">
                            {vendor.name}
                          </h2>
                          <p className="text-lg text-emerald-400 mb-2">
                            {vendor.companyName}
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2 text-gray-400">
                              <Phone className="h-4 w-4" />
                              <span>ID: {vendor.number}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                              <Mail className="h-4 w-4" />
                              <span>{vendor.email}</span>
                            </div>
                            <div className="flex items-start space-x-2 text-gray-400">
                              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="break-words">
                                {vendor.vendorCompanyAddress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {vendor.products.length}
                          </p>
                          <p className="text-sm text-gray-400">Products</p>
                        </div>
                        <ChevronDown
                          className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${
                            expandedVendor === vendor.number
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Products Grid (Expanded) */}
                  {expandedVendor === vendor.number && (
                    <div className="border-t border-gray-700 bg-gray-900/30">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Package className="h-5 w-5 text-teal-400 mr-2" />
                          Products ({vendor.products.length})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {vendor.products.map((product, index) => (
                            <div
                              onClick={() =>
                                openQrcode(product.bytecode as string)
                              }
                              key={index}
                              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-600 hover:border-teal-500/50 transition-colors duration-200"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-white text-lg leading-tight">
                                  {product.productName}
                                </h4>
                                <div className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded-full text-xs font-medium ml-2 whitespace-nowrap">
                                  {product.category}
                                </div>
                              </div>

                              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {product.description}
                              </p>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-4 w-4 text-emerald-400" />
                                    <span className="text-lg font-bold text-emerald-400">
                                      ${product.price}
                                    </span>
                                  </div>
                                  <div
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      product.stock > 50
                                        ? "bg-emerald-600/20 text-emerald-400"
                                        : product.stock > 10
                                        ? "bg-yellow-600/20 text-yellow-400"
                                        : "bg-red-600/20 text-red-400"
                                    }`}
                                  >
                                    {product.stock} in stock
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-500">
              All vendors and products are verified through blockchain
              technology
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
