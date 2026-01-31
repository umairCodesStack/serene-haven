import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //https://chyickgxgfddmcjnridl.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}
export async function getAvailableCabins(startDate, endDate) {
  console.log("Getting available cabins for:", { startDate, endDate });

  // 1. Get all cabins
  const { data: cabins, error: cabinsError } = await supabase
    .from("cabins")
    .select("*");

  if (cabinsError) {
    console.error(cabinsError);
    throw new Error("Cabins could not be loaded");
  }

  console.log("Total cabins:", cabins.length);

  // 2. Get all bookings that overlap with the requested date range
  const { data: overlappingBookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("cabinId")
    .lt("startDate", endDate)
    .gt("endDate", startDate)
    .in("status", ["unconfirmed", "checked-in"]);

  if (bookingsError) {
    console.error(bookingsError);
    throw new Error("Bookings could not be loaded");
  }

  console.log("Overlapping bookings:", overlappingBookings);

  // 3. Get IDs of booked cabins
  const bookedCabinIds = overlappingBookings.map((booking) => booking.cabinId);

  console.log("Booked cabin IDs:", bookedCabinIds);

  // 4. Filter out booked cabins
  const availableCabins = cabins.filter(
    (cabin) => !bookedCabinIds.includes(cabin.id),
  );

  console.log("Available cabins:", availableCabins.length);

  return availableCabins;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
