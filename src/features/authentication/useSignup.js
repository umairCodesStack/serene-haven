import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success("Signed up Successfully");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Signup Failed");
    },
  });
  return { signup, isLoading };
}
