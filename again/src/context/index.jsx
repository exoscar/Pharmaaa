import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x47f0F482fb4EC4DfE827A2E8AfC32bae48F5510d"
  );

  const { mutateAsync: addMedicine } = useContractWrite(
    contract,
    "addMedicine"
  );

  const address = useAddress();
  const connect = useMetamask();
  const publishMedicine = async (form) => {
    try {
      const data = await addMedicine({
        args: [
          form.MedicineName,
          form.NationalDrugCode,
          [form.Conditions],
          address,
          form.Quantity,
          form.Status,
          [form.Ingredients],
          [form.SideEffects],
          form.ExpiryDate,
          form.ManufactureDate,
          form.BatchNumber,
          form.Price,
        ],
      });
      console.log("Contract call success");
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const getMedicine = async (NDC) => {
    try {
      // const data = await contract.getMedicine(NDC);
      const data = await contract.call("getMedicine", [NDC]);
      return data;
      console.log(data);
    } catch (error) {
      console.log("Contract call failed", error);
      return 0;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        addMedicine: publishMedicine,
        getMedicine,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
