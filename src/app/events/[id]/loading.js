export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-my-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-my-blue border-t-transparent mx-auto mb-4"></div>
        <p className="text-my-gray text-lg">Indlæser udstillingen...</p>
      </div>
    </div>
  );
}
