const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];

export default function Example() {
  return (
    <div className="w-full p-8">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Members</legend>
        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {people.map((person, personIdx) => (
            <div
              key={personIdx}
              className="relative flex items-start py-4 px-2"
            >
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`person-${person.id}`}
                  className="select-none font-medium text-gray-700"
                >
                  {person.name}
                </label>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  id={`person-${person.id}`}
                  name={`person-${person.id}`}
                  type="checkbox"
                  className="focus:ring-none h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
