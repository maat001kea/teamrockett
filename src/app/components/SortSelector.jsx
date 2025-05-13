// src/app/components/SortSelector.jsx

export default function SortSelector({ sortBy, onChange }) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-5">Sortér efter:</label>
      <select value={sortBy} onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
        <option value="artist">Kunstnernavn</option>
        <option value="title">Titel</option>
        <option value="year">År</option>
      </select>
    </div>
  );
}
