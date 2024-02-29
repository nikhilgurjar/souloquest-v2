import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import User from "@/models/User";

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });

    return user;
  } catch {
    return null;
  }
};

export const getTourAgencyByEmail = async (email) => {
  try {
    const user = await TourCompany.findOne({ email: email });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch {
    return null;
  }
};

export const getUserByGoogleId = async (id) => {
  try {
    const user = await User.findOne({ provider: "google", googleId: id });
    return user;
  } catch {
    return null;
  }
};

export const getAccountByUserId = async (userId) => {};
