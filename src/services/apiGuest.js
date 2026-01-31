import supabase from "./supabase";

export async function createGuest(guestData) {
  const { data, error } = await supabase
    .from("guests")
    .insert([
      {
        fullName: guestData.fullName,
        email: guestData.email,
        nationalID: guestData.nationalID,
        nationality: guestData.nationality,
        countryFlag: guestData.countryFlag || "",
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
