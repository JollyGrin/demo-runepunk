import { useMutation } from "@tanstack/react-query";
import { postLogin } from ".";

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
  });
