import { apiClient } from "@/services/api/apiClient";
export * from "./useLogin";

export async function postLogin(body: {
  message: string;
  signature: string;
  publicKey: string;
}) {
  const res = await apiClient.post("/login", body);
  return res.data as { refreshToken: string; token: string };
}
