import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getTourAgencyByEmail, getUserByEmail } from "@/data/user";
import { connectMongoDB } from "@/lib/mongodb";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "crendentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectMongoDB();
        try {
          let user;
          if (credentials.role === "agency") {
            user = await getTourAgencyByEmail(credentials.email);
          } else {
            user = await getUserByEmail(credentials.email);
          }
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          } else {
            throw new Error("Incorrect email");
          }
        } catch (error) {
          throw new Error(error);
        }

        return null;
      },
    }),
  ],
};

export default authConfig;
