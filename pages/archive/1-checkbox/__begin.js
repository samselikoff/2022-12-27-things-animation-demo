const languages = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "HTML/CSS" },
  { id: 3, name: "Python" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "Ruby" },
  { id: 6, name: "PHP" },
  { id: 7, name: "Swift" },
];

export default function Example() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white py-8">
        <p className="px-8 text-lg font-medium text-gray-900">
          Favorite languages
        </p>
        <div className="mt-4">
          {languages.map((language) => (
            <div className="flex items-center px-8 py-3" key={language.id}>
              <div className="flex items-center">
                <input
                  id={language.id}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus-visible:ring focus-visible:ring-blue-400"
                />
              </div>

              <div className="ml-3">
                <label className="text-gray-700" htmlFor={language.id}>
                  {language.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
