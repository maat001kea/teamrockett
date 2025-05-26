// import { supabase } from "./supabase";

// // 🔼 Upload billede og returnér public URL
// export async function uploadImage(file) {
//   const fileExt = file.name.split(".").pop();
//   const fileName = `${Date.now()}.${fileExt}`;
//   const filePath = `${fileName}`;

//   const { data: uploadData, error: uploadError } = await supabase.storage
//     .from("artworks") // Bucket-navn — tjek at den matcher i Supabase
//     .upload(filePath, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   console.log("🔄 Upload response:", { uploadData, uploadError });

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

import { supabase } from "./supabase";

// 🔼 Upload billede og returnér public URL
export async function uploadImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `event-images/${fileName}`; // Organiseret sti

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("artworks") // Bucket-navn
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  console.log("🔄 Upload response:", { uploadData, uploadError });

  if (uploadError) throw uploadError;

  const { data: publicData, error: publicError } = supabase.storage.from("artworks").getPublicUrl(filePath);

  console.log("🌐 Public URL response:", { publicData, publicError });

  if (publicError) throw publicError;

  return {
    publicUrl: publicData.publicUrl,
    filePath, // Gem stien, hvis du vil slette billedet senere
  };
}

// 🗑️ Slet billede
export async function deleteImage(filePath) {
  const { error } = await supabase.storage.from("artworks").remove([filePath]);
  if (error) throw error;
}
