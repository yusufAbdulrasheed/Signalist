"use server";

import { betterAuthDB } from "@/lib/mongodb";

export const getAllUsersForNewsEmail = async () => {
  try {
    const users = await betterAuthDB
      .collection("user")
      .find({ email: { $exists: true, $ne: null } })
      .project({ _id: 1, email: 1, name: 1 })
      .toArray();

    return users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      name: user.name || "",
    }));
  } catch (e) {
    console.error("Error fetching all users:", e instanceof Error ? e.message : String(e));
    return [];
  }
};

// export const updateUserRole = async (email: string, role: string) => {
//   try{
//     await betterAuthDB.collection("user").updateOne({ email}, { $set: { role }})
//   } catch (e){
//     console.error("Error updating user role:", e instanceof Error ? e.message : String(e))
//   }
// }
