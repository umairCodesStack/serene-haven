import supabase from "./supabase";

async function loginApi(email, password) {
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
    //throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  const { error } = supabase.auth.signOut();
  if (error) throw new Error("Failed to LogOut");
}
export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) {
    console.log(error.message);
  }
  return data;
}
export default loginApi;
