// "use client";

// import { use, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { getAllEvents, updateEvent } from "@/lib/api";
// import BackButton from "../../components/BackButton";
// import KunstListe from "@/app/components/KunstListe";
// import AnimatedButton from "../../components/AnimatedButton";

// // 🧩 Zod schema: definerer krav til hvert felt i formularen
// const eventSchema = z.object({
//   title: z.string().min(1, "Titel er påkrævet"),
//   description: z.string().min(1, "Beskrivelse er påkrævet"),
//   date: z.string().min(1, "Dato er påkrævet"),
//   locationId: z.string().optional(),
//   curator: z.string().optional(),
// });

// export default function ChangeEventPage({ params }) {
//   const { id } = use(params); // ✅ Unwrap med use()
//   const router = useRouter();

//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(eventSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       date: "",
//       locationId: "",
//       curator: "",
//     },
//   });

//   useEffect(() => {
//     const loadEvent = async () => {
//       try {
//         const events = await getAllEvents();
//         const found = events.find((e) => e.id === id);
//         if (!found) throw new Error("Event ikke fundet.");

//         setValue("title", found.title);
//         setValue("description", found.description);
//         setValue("date", found.date);
//         setValue("locationId", found.location?.id || "");
//         setValue("curator", found.curator || "");

//         const artworkIds = found.artworkIds || [];
//         const responses = await Promise.all(
//           artworkIds.map((artId) =>
//             fetch(`https://api.smk.dk/api/v1/art/search/?keys=${artId}&object_number=${artId}`)
//               .then((res) => res.json())
//               .then((data) => {
//                 const item = data.items?.[0];
//                 return item ? { id: artId, title: item.titles?.[0]?.title || artId, image: item.image_thumbnail || "" } : { id: artId, title: artId, image: "" };
//               })
//           )
//         );

//         setArtworks(responses);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     loadEvent();
//   }, [id, setValue]);

//   const handleAddArtwork = (artwork) => {
//     if (!artworks.find((a) => a.id === artwork.id)) {
//       setArtworks([...artworks, artwork]);
//     }
//   };

//   const handleRemoveArtwork = (removeId) => {
//     setArtworks(artworks.filter((a) => a.id !== removeId));
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await updateEvent(id, {
//         ...data,
//         artworkIds: artworks.map((a) => a.id),
//       });
//       alert("Event opdateret!");
//       router.push("/events");
//     } catch (err) {
//       setError("Kunne ikke opdatere eventet: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return <p className="text-red-600 p-4">{error}</p>;

//   return (
//     <>
//       <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
//         <BackButton />
//       </div>
//       <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
//         <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Redigere Event</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block font-semibold font-sans text-my-blue">Titel</label>
//             <input {...register("title")} className="block w-full p-2 border text-my-blue font-sans" />
//             {errors.title && <p className="text-red-600 text-sm font-sans">{errors.title.message}</p>}
//           </div>

//           <div>
//             <label className="block font-semibold text-my-blue font-sans">Beskrivelse</label>
//             <textarea {...register("description")} className="w-full p-2 border text-my-blue font-sans" />
//             {errors.description && <p className="text-red-600 text-sm font-sans">{errors.description.message}</p>}
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block font-semibold text-my-blue font-sans">Dato</label>
//               <input type="date" {...register("date")} className="w-full p-2 border text-my-blue font-sans" />
//               {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
//             </div>

//             <div className="w-1/2">
//               <label className="block font-semibold text-my-blue font-sans">Lokation ID</label>
//               <input {...register("locationId")} className="w-full p-2 border text-my-blue font-sans" />
//             </div>
//           </div>

//           <div>
//             <label className="block font-semibold text-my-blue font-sans">Kurator</label>
//             <input {...register("curator")} className="w-full p-2 border text-my-blue font-sans" />
//           </div>

//           <div className="mb-4">
//             <label className="block font-sans text-gray-600 mb-5">Valgte kunstværker:</label>
//             <div className="flex flex-wrap gap-4">
//               {artworks.map((art) => (
//                 <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group font-sans">
//                   <button onClick={() => handleRemoveArtwork(art.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded opacity-100 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition" title="Fjern">
//                     ✕
//                   </button>
//                   <img src={art.image || "/placeholder.jpg"} alt={art.title} className="w-full h-auto mb-1" />
//                   <p className="text-xs font-medium break-words font-sans">{art.title}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <AnimatedButton type="submit" disabled={loading}>
//             Gem ændringer
//           </AnimatedButton>
//         </form>
//       </div>

//       <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllEvents, updateEvent } from "@/lib/api";
import BackButton from "../../components/BackButton";
import KunstListe from "@/app/components/KunstListe";
import AnimatedButton from "../../components/AnimatedButton";
import dummy from "@/app/assets/dummy.webp";
import { uploadImage, deleteImage } from "@/lib/upload";

const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
});

export default function ChangeEventPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imgSrc, setImgSrc] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      locationId: "",
      curator: "",
    },
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const found = events.find((e) => e.id === id);
        if (!found) throw new Error("Event ikke fundet.");

        setValue("title", found.title);
        setValue("description", found.description);
        setValue("date", found.date);
        setValue("locationId", found.location?.id || "");
        setValue("curator", found.curator || "");

        setImgSrc(found.imageUrl || dummy.src);
        setUploadedImageUrl(found.imageUrl || null);
        setUploadedImageName(found.imageUrl?.split("/").pop() || null);

        const artworkIds = found.artworkIds || [];
        const responses = await Promise.all(
          artworkIds.map(async (artId) => {
            const artIdWithoutPng = artId.replace(/\.png$/, "");

            // Hvis det er cover-billede fra Supabase, brug direkte Supabase URL
            if (artId === uploadedImageName) {
              const supabaseUrl = `https://laqizwqplonobdzjohhg.supabase.co/storage/v1/object/public/artworks/${artId}`;
              return { id: artId, title: artId, image: supabaseUrl };
            }

            // Ellers hent billede fra SMK API
            const res = await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${artIdWithoutPng}&object_number=${artIdWithoutPng}`);
            const data = await res.json();
            const item = data.items?.[0];

            if (item) {
              return {
                id: artIdWithoutPng,
                title: item.titles?.[0]?.title || artIdWithoutPng,
                image: item.image_thumbnail || dummy.src,
              };
            }
            return { id: artIdWithoutPng, title: artIdWithoutPng, image: dummy.src };
          })
        );
        setArtworks(responses);
      } catch (err) {
        console.error("Fejl under hentning:", err);
        setError(err.message);
      }
    };

    loadEvent();
  }, [id, setValue, uploadedImageName]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (uploadedImageName) {
        await deleteImage(uploadedImageName);
        setArtworks((prev) => prev.filter((a) => a.id !== uploadedImageName));
      }
      const url = await uploadImage(file);
      setUploadedImageUrl(url);
      setUploadedImageName(file.name);
      setImgSrc(url);
      e.target.value = "";
    } catch (err) {
      console.error("Fejl ved upload:", err);
      setError("Upload fejlede: " + (err.message || JSON.stringify(err)));
    }
  };

  const handleDeleteImage = async () => {
    try {
      if (uploadedImageName) {
        await deleteImage(uploadedImageName);
        setUploadedImageUrl(null);
        setUploadedImageName(null);
        setImgSrc(dummy.src);
        setArtworks((prev) => prev.filter((a) => a.id !== uploadedImageName));
      }
    } catch (err) {
      console.error("Fejl ved sletning:", err);
    }
  };

  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  const handleRemoveArtwork = (removeId) => {
    setArtworks(artworks.filter((a) => a.id !== removeId));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await updateEvent(id, {
        ...data,
        artworkIds: [
          ...(uploadedImageName ? [uploadedImageName] : []),
          ...artworks.filter((a) => a.id !== uploadedImageName).map((a) => a.id.replace(/\.png$/, "")), // gem kun object_number
        ],
      });
      alert("Event opdateret!");
      router.push("/events");
    } catch (err) {
      console.error("Fejl under opdatering:", err);
      setError("Kunne ikke opdatere eventet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <>
      <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
        <BackButton />
      </div>

      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Rediger Event</h2>

        <div className="mb-4 flex justify-center">
          <img src={imgSrc} alt="Event billede" className="w-48 h-auto rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-sans text-gray-600 mb-2">Upload billede:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImageUrl && (
            <div className="mt-2">
              <img src={uploadedImageUrl} alt="Uploaded" className="w-32 rounded" />
              <button onClick={handleDeleteImage} className="mt-1 text-sm text-red-600 underline">
                Slet billede
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-my-blue font-sans">Titel</label>
            <input {...register("title")} className="block w-full p-2 border text-my-blue font-sans" />
            {errors.title && <p className="text-red-600 text-sm font-sans">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-my-blue font-sans">Beskrivelse</label>
            <textarea {...register("description")} className="w-full p-2 border text-my-blue font-sans" />
            {errors.description && <p className="text-red-600 text-sm font-sans">{errors.description.message}</p>}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-my-blue font-sans">Dato</label>
              <input type="date" {...register("date")} className="w-full p-2 border text-my-blue font-sans" />
              {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
            </div>
            <div className="w-1/2">
              <label className="block font-semibold text-my-blue font-sans">Lokation ID</label>
              <input {...register("locationId")} className="w-full p-2 border text-my-blue font-sans" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-my-blue font-sans">Kurator</label>
            <input {...register("curator")} className="w-full p-2 border text-my-blue font-sans" />
          </div>

          <div className="mb-4">
            <label className="block font-sans text-gray-600 mb-2">Valgte kunstværker:</label>
            <div className="flex flex-wrap gap-4">
              {artworks
                .filter((art) => art.id !== uploadedImageName)
                .map((art) => (
                  <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group font-sans">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveArtwork(art.id);
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded transition"
                      title="Fjern"
                    >
                      ✕
                    </button>
                    <img src={art.image || dummy.src} alt={art.title} className="w-full h-auto mb-1 rounded" />
                    <p className="text-xs font-medium break-words">{art.title}</p>
                  </div>
                ))}
            </div>
          </div>

          <AnimatedButton type="submit" disabled={loading}>
            {loading ? "Gemmer..." : "Gem ændringer"}
          </AnimatedButton>
        </form>
      </div>

      <div className="w-full px-6">
        <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.filter((a) => a.id !== uploadedImageName).map((a) => a.id.replace(/\.png$/, ""))} />
      </div>
    </>
  );
}
