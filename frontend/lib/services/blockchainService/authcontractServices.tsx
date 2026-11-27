import { LoginForm, User, UserType, parseUser } from "@/lib/models/auth";
import { ContractWriteResponse } from "@/lib/models/responseMessage";
import { ethers } from "ethers";
import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";
import {
  getmainContractProvider,
  mainContractProvider,
} from "./providers/localHostProvider";

const registerUserWithContract = async (
  user: User
): Promise<ContractWriteResponse> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const transaction = await alchemyContract?.registerUser(
      user.fullName ?? "",
      user.profileHash ?? "",
      user.email ?? "",
      user.password ?? "",
      user.addressLocation ?? "",
      user.phoneNumber ?? "",
      user.Role ?? ""
    );
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message  ${error}`,
    };
  }
};

const signInWithEmailandPasswordWithContract = async (
  loginModel: LoginForm
): Promise<ContractWriteResponse> => {
  try {
    const contract = await mainContractProvider();
    const alchemyContract = await writeAlchemyProvider();
    let user: User = {
      email: "",
      password: "",
      phoneNumber: "",
      addressLocation: "",
      dateJoined: new Date(),
      Role: UserType.Anonymous,
    };

    const transaction = await alchemyContract?.login(
      loginModel.email,
      loginModel.password
    );

    const getLoginInfo = new Promise((resolve, reject) => {
      alchemyContract?.on("LoginInfo", (result: User, event) => {
        event.removeListener();

        resolve(result);
      });

      setTimeout(() => {
        reject(new Error("timeout"));
      }, 60000);
    });

    await transaction.wait();

    const result = (await getLoginInfo) as User;
    console.log(`role ${result.Role}`);
    const roleType =
      result.Role === "Admin"
        ? UserType.Admin
        : result.Role === "Buyer"
        ? UserType.Buyer
        : UserType.Seller;

    user = {
      id: result.id,
      fullName: result.fullName,
      email: result.email,
      addressLocation: result.addressLocation,
      profileHash: result.profileHash,
      Role: roleType,
      password: result.password,
      phoneNumber: result.phoneNumber,
      isVerified: result.isVerified,
      isLoggedIn: result.isLoggedIn,
      dateJoined: result.dateJoined,
    };

    if (result.isLoggedIn) {
      setLocalStorage(result.id as string);
    }
    console.log("working..");
    return { status: true, data: user };
  } catch (error) {
    return {
      status: false,
      data: `error message : ${error}`,
    };
  }
};

const signInWithWalletWithContract = async (userAddress: string) => {
  try {
    const contract = await getmainContractProvider();
    const response = await contract?.checkUserifExist(userAddress);
  } catch (error) {
    console.log(`error message : ${error}`);
  }
};

const initialLoadUser = async (): Promise<User | null> => {
  const userAddress = localStorage.getItem("_user_address");
  try {
    if (userAddress) {
      const contract = await getmainContractProvider();
      const alchemyContract = await getAlchemyProvider();
      const response = await alchemyContract?.getUser(userAddress);
      return response as User;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const setLocalStorage = (userAddress: string) => {
  localStorage.setItem("_user_address", userAddress);
};

const clearLocalStorage = () => {
  localStorage.removeItem("_user_address");
};

const getUserAddress_s = async (): Promise<User[] | null> => {
  try {
    const contract = await getmainContractProvider();
    const alchemyContract = await getAlchemyProvider();
    const response = await alchemyContract?.getUsers();
    console.log({ users: response });
    let users: User[] = [];
    for (let address of response) {
      let user = { ...address };
      const parsedUser = parseUser(user);
      if (parsedUser.Role != "Admin") users.push(parsedUser);
    }
    console.log({ users });
    return users;
  } catch (error) {
    console.log(`error message : ${error}`);
    return null;
  }
};

const updateProfileWithContract = () => {};
const resetPasswordWithContract = () => {};

export {
  registerUserWithContract,
  signInWithEmailandPasswordWithContract,
  signInWithWalletWithContract,
  initialLoadUser,
  setLocalStorage,
  clearLocalStorage,
  getUserAddress_s,
  updateProfileWithContract,
  resetPasswordWithContract,
};
