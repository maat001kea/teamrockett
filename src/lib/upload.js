// import { supabase } from "./supabase";

// // 🔼 Upload billede og returnér public URL
// export async function uploadImage(file) {
//   const filePath = file.name; // Brug det originale filnavn

//   const { data: uploadData, error: uploadError } = await supabase.storage
//     .from("artworks") // Bucket-navn — tjek at den matcher i Supabase
//     .upload(filePath, file, {
//       cacheControl: "3600",
//       upsert: false, // Undgå at overskrive eksisterende filer
//     });

//   if (uploadError) throw uploadError;

//   const { data: publicData, error: publicError } = supabase.storage.from("artworks").getPublicUrl(filePath);

//   console.log("🌐 Public URL response:", { publicData, publicError });

//   if (publicError) throw publicError;

//   return publicData.publicUrl;
// }

// // 🗑️ Slet billede
// export async function deleteImage(filename) {
//   const { error } = await supabase.storage.from("artworks").remove([filename]);
//   if (error) throw error;
// }

// src/lib/upload.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file) {
  const filePath = file.name;
  const { data: uploadData, error: uploadError } = await supabase.storage.from("artworks").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data: publicData, error: publicError } = supabase.storage.from("artworks").getPublicUrl(filePath);
  if (publicError) throw publicError;

  return publicData.publicUrl;
}

export async function deleteImage(fileName) {
  const { error } = await supabase.storage.from("artworks").remove([fileName]);
  if (error) throw error;
}

// import { supabase } from "./supabase";

// // 🔼 Upload billede og returnér public URL
// export async function uploadImage(file) {
//   const fileExt = file.name.split(".").pop();
//   const fileName = `${Date.now()}.${fileExt}`;
//   const filePath = `event-images/${fileName}`; // Organiseret sti

//   const { data: uploadData, error: uploadError } = await supabase.storage
//     .from("artworks") // Bucket-navn
//     .upload(filePath, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   console.log("🔄 Upload response:", { uploadData, uploadError });

//   if (uploadError) throw uploadError;

//   const { data: publicData, error: publicError } = supabase.storage.from("artworks").getPublicUrl(filePath);

//   console.log("🌐 Public URL response:", { publicData, publicError });

//   if (publicError) throw publicError;

//   return {
//     publicUrl: publicData.publicUrl,
//     filePath, // Gem stien, hvis du vil slette billedet senere
//   };
// }

// // 🗑️ Slet billede
// export async function deleteImage(filePath) {
//   const { error } = await supabase.storage.from("artworks").remove([filePath]);
//   if (error) throw error;
// }
