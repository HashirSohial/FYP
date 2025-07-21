import React, { useEffect, useState } from "react";
import { Plus, Download, Package, QrCode, Calendar, Hash } from "lucide-react";
import { useAccount } from "wagmi";
import { YourApp } from "./custombtn";
import {
  addProduct,
  getTxn,
  isVendorRegister,
  TotalProducts,
  totalProductsOfVender,
  TotalVenders,
} from "../config/methods";
import { VendorRegistrationForm } from "./manifacturerForm";
import { ToastContainer, toast } from "react-toastify";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  productCode: string;
  status: "registered" | "flagged";
}

export const ManufacturerDashboard: React.FC = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { address, isConnected } = useAccount();
  const [isVendor, setisVendor] = useState<boolean>(false);
  const [formLoader, setformLoader] = useState<boolean>(false);
  const [productLoader, setproductLoader] = useState<boolean>(false);
  const [TotalVendors, setTotalVendors] = useState("");
  const [TotalProducs, setTotalProducts] = useState("");
  const [reset, setreset] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    checkForManufaturer();
    getAdressedDetails();
    getNonAdressedDetails();
  }, [address, isConnected, formLoader, reset]);
  useEffect(() => {
    checkForManufaturer();
    getNonAdressedDetails();
  }, []);
  // ✅ Updated `formData` object to include your desired fields
  const getAdressedDetails = async () => {
    const productsRaw = await totalProductsOfVender(address as string);

    const products: Product[] = productsRaw.map((p: any) => ({
      id: `PRD${String(p.productId).padStart(3, "0")}`,
      name: p.productName,
      description: p.description,
      price: Number(p.price),
      stock: Number(p.stock),
      category: p.category,
      productCode: p.productCode,
      status: "registered",
    }));

    setProducts(products); // no newProduct here
  };

  const getNonAdressedDetails = async () => {
    try {
      let resp = await TotalProducts();
      let resp2 = await TotalVenders();
      setTotalProducts(resp);
      setTotalVendors(resp2);
    } catch (error) {
      console.log("error while getting data from contract");
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const checkForManufaturer = async () => {
    setLoading(true);
    try {
      let data = await isVendorRegister(address as string);
      setisVendor(data);
      console.log("kashif", data);
    } catch (error) {
      console.log(
        "error while fetching data from blockchain for manufracturer"
      );
    }
    setLoading(false);
  };

  console.log(formData);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setproductLoader(true);
    try {
      let resp = await addProduct(formData);
      let txn = await getTxn(resp);
      if (!txn || !resp) {
        toast.error("error while transaction ");
      }
      console.log("in product submit function", formData, resp);
      setreset(!reset);
      toast("Product added Sucessfully");
    } catch (error) {
      toast.error("error while adding product");
      console.log("error while adding product", error);
    }
    // const newProduct: Product = {
    //   id: `PRD${String(products.length + 1).padStart(3, "0")}`,
    //   batchNumber: formData.batchNumber,
    //   name: formData.name,
    //   manufacturingDate: formData.manufacturingDate,
    //   expiryDate: formData.expiryDate,
    //   status: "registered",
    //   verificationCount: 0,
    // };
    // setProducts([...products, newProduct]);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
    setproductLoader(false);
    setTimeout(() => {
      setShowProductForm(false);
    }, 3000);
  };

  const generateBarcode = (productId: string) => {
    alert(
      `Barcode generated for product ${productId}. Download will start shortly.`
    );
  };
  console.log(TotalProducs, TotalVendors);

  return (
    <div className="min-h-screen bg-black py-8">
      {isConnected ? (
        <>
          {Loading ? (
            <>
              <div className="min-h-screen bg-black flex items-center justify-center py-8">
                <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                  <div className="text-center text-white">
                    Checking weather manufacturer exsist
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {isVendor ? (
                <>
                  {" "}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 mb-8 border border-teal-500/30">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h1 className="text-3xl font-bold text-white">
                            Manufacturer Dashboard
                          </h1>
                          <p className="text-gray-400 mt-2">
                            Manage your products and monitor blockchain
                            registrations
                          </p>
                        </div>
                        <button
                          onClick={() => setShowProductForm(true)}
                          className="mt-4 md:mt-0 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
                        >
                          <Plus className="h-5 w-5" />
                          <span>Register New Product</span>
                        </button>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 border border-gray-700">
                        <div className="flex items-center">
                          <Package className="h-8 w-8 text-teal-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">
                              Total Products in contract
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {Number(TotalProducs)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 border border-gray-700">
                        <div className="flex items-center">
                          <QrCode className="h-8 w-8 text-emerald-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">
                              Total Vendors
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {Number(TotalVendors)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 border border-gray-700">
                        <div className="flex items-center">
                          <Calendar className="h-8 w-8 text-cyan-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">
                              Active Products
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {
                                products.filter((p) => p.status !== "flagged")
                                  .length
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 border border-gray-700">
                        <div className="flex items-center">
                          <Hash className="h-8 w-8 text-yellow-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">
                              Blockchain Records
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {products.length}
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    {/* Product Registration Form Modal */}
                    {showProductForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg max-w-md w-full p-6 border border-teal-500/30 shadow-2xl">
                          <h2 className="text-2xl font-bold text-white mb-6">
                            Register New Product
                          </h2>
                          <form
                            onSubmit={handleProductSubmit}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Product Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter product Name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Product description
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.description}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    description: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter product description"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                price
                              </label>
                              <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    price: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter product price"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                category
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.category}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    category: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Enter product category"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                stock
                              </label>
                              <input
                                type="number"
                                required
                                value={formData.stock}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    stock: e.target.value,
                                  })
                                }
                                placeholder="Enter product stock"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                              />
                            </div>

                            <div className="flex space-x-3 pt-4">
                              {productLoader ? (
                                <>
                                  {" "}
                                  <button
                                    disabled={productLoader}
                                    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded-md hover:from-teal-700 hover:to-emerald-700 transition-all duration-200"
                                  >
                                    Registering...
                                  </button>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded-md hover:from-teal-700 hover:to-emerald-700 transition-all duration-200"
                                  >
                                    Register Product
                                  </button>
                                </>
                              )}

                              <button
                                type="button"
                                onClick={() => setShowProductForm(false)}
                                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                            {/* <ToastContainer
                                position="top-right"
                                theme="dark"
                                hideProgressBar={false}
                                newestOnTop={true}
                                closeOnClick
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                              /> */}
                          </form>
                        </div>
                      </div>
                    )}

                    {/* Products Table */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl overflow-hidden border border-gray-700">
                      <div className="px-6 py-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-white">
                          Registered Products
                        </h2>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Product
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                stock
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-gradient-to-br from-gray-900 to-black divide-y divide-gray-700">
                            {products.map((product) => (
                              <tr
                                key={product.id}
                                className="hover:bg-gray-800/50 transition-colors duration-150"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-white">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      ID: {product.id}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {product.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                      product.status === "registered"
                                        ? "bg-teal-900 text-teal-300"
                                        : "bg-red-900 text-red-300"
                                    }`}
                                  >
                                    {product.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {product.stock}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <VendorRegistrationForm setformLoader={setformLoader} />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div className="min-h-screen bg-black flex items-center justify-center py-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Connect Wallet
                </h2>
                <p className="text-gray-400">
                  Connect your wallet to get started
                </p>
              </div>
              <YourApp />

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">Supported wallets</p>
              </div>
            </div>
          </div>
        </div>
      )}
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
