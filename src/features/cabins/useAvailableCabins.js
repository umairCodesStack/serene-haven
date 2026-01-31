import { useQuery } from "@tanstack/react-query";
import { getAvailableCabins } from "../../services/apiCabins";

export function useAvailableCabins(startDate, endDate) {
  const {
    data: availableCabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableCabins", startDate, endDate],
    queryFn: () => getAvailableCabins(startDate, endDate),
    enabled: !!startDate && !!endDate, // Only run when both dates exist
  });

  // Return empty array instead of undefined when query is disabled
  return {
    availableCabins: availableCabins || [],
    isLoading,
    error,
  };
}
