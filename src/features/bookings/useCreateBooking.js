import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      console.error("Booking creation error:", err);
      toast.error(err.message || "Failed to create booking");
    },
  });

  return { createBooking, isLoading };
}
