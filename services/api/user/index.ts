import { apiClient } from "@/services/api/apiClient";
export * from "./useUser";

export async function getMe() {
  const res = await apiClient.get("/user/me");
  return res.data;
}
