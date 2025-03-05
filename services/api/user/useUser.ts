import { useQuery } from "@tanstack/react-query";
import { getMe } from ".";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
