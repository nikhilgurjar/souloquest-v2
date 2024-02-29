import NextAuth from "next-auth";
import User from "@/models/User";

import authConfig from "./auth.config";
import { getUserById, getUserByGoogleId } from "@/data/user";
// import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await User.findByIdAndUpdate(user._id, { emailVerified: true });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "google") {
        const existingUser = await getUserByGoogleId(user.id);
        if (!existingUser) {
          const user = await User.create({
            name: user.name,
            email: user.email,
            googleId: user.id,
            role: "user",
            profilePic: user.image,
          });
        }
        return true;
      }
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.isOAuth = existingUser.isOAuth;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  //   adapter: Mongo,
  session: { strategy: "jwt" },
  ...authConfig,
});

// {
//   id: '34561ef2-f2c7-47ff-94b2-97d17a071bd3',
//   name: 'Cellar Tech',
//   email: 'cellartech01@gmail.com',
//   image: 'https://lh3.googleusercontent.com/a/ACg8ocIItwOZi0OCTnrSdV7LeLr-EW1Hs4s0PiTASqAUTPgTxw=s96-c'
// } {
//   access_token: 'ya29.a0AfB_byBXFp-ua0Mkbm-h5_l5swv-VKbwCGH4GVBkd2pIYmALW7POva4ITAHpcEgMVD4NQ_l0l3fLAnEoXbGyQUFNolyB2YZ74_3WCzShaFZMmuY3J7rpWWInJzTZW4bqWxj_m63ZGJusb47N5VgRe34jgo6Yv0Xsf5GOaCgYKAccSARESFQHGX2MiWZSIjq2q9yPN_6nk7oB-KA0171',
//   expires_in: 3599,
//   scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//   token_type: 'bearer',
//   id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1YzE4OGE4MzU0NmZjMTg4ZTUxNTc2YmE3MjgzNmUwNjAwZThiNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc1NzEwNzQyNjYtMG5obGh1NTljc2pvbzM3dDFydTBpNnJ1N3RxNzBmdW8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc1NzEwNzQyNjYtMG5obGh1NTljc2pvbzM3dDFydTBpNnJ1N3RxNzBmdW8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUyMDc3OTg2OTg2OTQyNDU5MjIiLCJlbWFpbCI6ImNlbGxhcnRlY2gwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImhJRE53TFVMOTRNLVpsR1JiVmh1VHciLCJuYW1lIjoiQ2VsbGFyIFRlY2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUl0d09aaTBPQ1RuclNkVjdMZUxyLUVXMUhzNHMwUGlUQVNxQVVUUGdUeHc9czk2LWMiLCJnaXZlbl9uYW1lIjoiQ2VsbGFyIiwiZmFtaWx5X25hbWUiOiJUZWNoIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MDg3MDg1OTksImV4cCI6MTcwODcxMjE5OX0.PWZdDJvDsUTlYVDr9_tCTRAy2rb-eG4-OZEvgoXe6kjF6LSS51L0f_8RKIRNCJP5D9GYeXzcPmNJhgdJgzipLNJOlqbhy_fbrl3r6_jI9gzaY1JarrxY74cgp3FC2lL8zbcgzZ6LSRh-xhg_Vm81Y4M-2TUcY1kJl5zTpPo4SYcpkklrVXRQk0KHeCmc6shXiIPM0w5FliGpSWOyMKcVG9htWnjN7Rc-Ohj0WGwRIQEiKULR5OX3pg-9cMQ6q2me_tp-CCEqzZ0HbH6vit6Eb6fbnx0uWVB4ADbmCcijzYJAEf90ncAt4I2JN2kNAMgQz3ePo94uTJrWJ-bublQtyA',
//   expires_at: 1708712197,
//   provider: 'google',
//   type: 'oidc',
//   providerAccountId: '115207798698694245922'
// }
