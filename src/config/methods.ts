import { readContract, writeContract } from "@wagmi/core";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "./config";
import { Address } from "./exports";
import { Abi } from "./exports";
export const isVendorRegister = async (address: string) => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    functionName: "isVendorRegister",
    args: [address],
  });

  return result as boolean;
};



export const TotalProducts = async () => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    functionName: "TotalProducts",
  });

  return result as string;
};
export const TotalVenders = async () => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    functionName: "TotalVenders",
  });

  return result as string;
};

export const totalProductsOfVender = async (address:string) => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    args:[address],
    functionName: "totalProductsOfVender",
  });

  return result as any;
};

export const totalVenderDetails = async () => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    functionName: "totalVenderDetails",
  });

  return result as any;
};




export const getProductAndVendorByCode = async (data:string) => {
  const result = await readContract(config, {
    abi: Abi,
    address: Address,
    functionName: "getProductAndVendorByCode",
    args:[data],
  });

  return result as any;
};

export const getTxn = async (hash: any) => {
  try {
    if (!hash) {
      return null;
    }
    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash,
    });

    return transactionReceipt.status === "success" ? true : false;
  } catch (error) {
    console.error("Error getTxn:", error);
    return null;
  }
};
// 1:
export const registerVendor = async (FormData:any) => {
  const result = await writeContract(config, {
    abi: Abi,
    address: Address,
    functionName: "registerVendor",
    args: [FormData.name,FormData.companyName,FormData.number,FormData.email,FormData.venderCompanyAddress],
  });
  return result;

};







export const addProduct = async (FormData:any) => {
  const result = await writeContract(config, {
    abi: Abi,
    address: Address,
    functionName: "addProduct",
    args: [FormData.name,FormData.description,FormData.price,FormData.stock,FormData.category],
  });
  return result;

};