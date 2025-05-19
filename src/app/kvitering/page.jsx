export default async function kivtering({ searchParams }) {
  const { id } = await searchParams;
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">{id}</h1>
    </div>
  );
}
