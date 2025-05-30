//kilder til koden

//https://supabase.com/docs/reference/javascript/installing
//Jeg har det samme, men du bruger miljøvariabler "process.env"
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file) {
  const filePath = file.name;
  // Kilde  https://supabase.com/docs/reference/javascript/storage-from-upload
  // Uploader et billede og generere en tidsbegrænset URL, som jeg kan dele med brugeren, ved at bruge createSignedUrl

  const { data: uploadData, error: uploadError } = await supabase.storage.from("artworks").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  //Kilde https://supabase.com/docs/reference/javascript/storage-from-getpublicurl
  // funktion for at få URL’en til en fil i en offentlig bucket.

  const { data: publicData, error: publicError } = supabase.storage.from("artworks").getPublicUrl(filePath);
  if (publicError) throw publicError;

  return publicData.publicUrl;
}
//https://supabase.com/docs/reference/javascript/storage-from-remove
//sletter filer i bucket
export async function deleteImage(fileName) {
  const { error } = await supabase.storage.from("artworks").remove([fileName]);
  if (error) throw error;
}
