"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";

const ImageUploader = ({ onFileSelect, hideInput = false, currentPath = null }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Kun billede-filer er tilladt.");
      return;
    }

    // Slet tidligere billede hvis det findes
    if (currentPath) {
      console.log("🧹 Forsøger at slette tidligere billede:", currentPath);
      const { error: removeError } = await supabase.storage.from("events").remove([currentPath]);
      if (removeError) {
        console.warn("⚠️ Fejl ved sletning af tidligere billede:", removeError.message);
      } else {
        console.log("✅ Tidligere billede slettet:", currentPath);
      }
    }

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const path = filename; // ingen mappe

    console.log("📤 Starter upload af:", filename);

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const { error: uploadError } = await supabase.storage.from("events").upload(path, file);
    if (uploadError) {
      console.error("❌ Upload fejl:", uploadError);
      alert("Fejl ved upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("events").getPublicUrl(path);
    console.log("✅ Uploadet URL:", data.publicUrl);
    console.log("📎 imagePath sendt videre:", path);

    setUploading(false);
    onFileSelect(data.publicUrl, path);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative space-y-2">
      {!hideInput && <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="w-full p-2 border" ref={fileInputRef} />}

      {preview && <img src={preview} alt="Forhåndsvisning" className="mt-2 max-w-xs border rounded cursor-pointer" onClick={triggerFilePicker} />}

      {uploading && <p className="text-sm text-gray-500">Uploader billede...</p>}
    </div>
  );
};

export default ImageUploader;
