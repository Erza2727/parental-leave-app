import { InputHTMLAttributes, useState } from "react";

type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FileUpload({
  label,
  error,
  id,
  className = "",
  onChange,
  ...props
}: FileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileNames(files.map((f) => f.name));

    onChange?.(e); // let Controller handle it
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>

      <input
        id={id}
        type="file"
        multiple
        onChange={handleChange}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
          error
            ? "border-red-500 bg-red-50"
            : "border-slate-300 bg-white focus:border-slate-500"
        } ${className}`}
        {...props}
      />

      {fileNames.length > 0 && (
        <ul className="text-sm text-slate-600">
          {fileNames.map((name, i) => (
            <li key={i}>• {name}</li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
