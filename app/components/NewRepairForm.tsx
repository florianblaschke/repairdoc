import { createRepair } from "@/lib/actions";

export default function NewRepairForm() {
  return (
    <form
      action={createRepair}
      className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
      noValidate
    >
      <label className="mb-5" htmlFor="ticket">
        <span>Ticketnummer</span>
        <input
          className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
          type="number"
          name="ticket"
          placeholder="Optional"
        />
      </label>
      <label className="mb-5">
        Bestellnummer
        <input
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 "
          type="number"
          name="order"
          placeholder="Optional"
        />
      </label>
      <label className="mb-5">
        Vorname
        <input
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          type="text"
          name="firstName"
          required
          placeholder="Max"
        />
      </label>
      <label className="mb-5">
        Nachname
        <input
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          type="text"
          name="lastName"
          required
          placeholder="Mustermann"
        />
      </label>
      <label className="mb-5">
        <span>E-Mail</span>
        <input
          className="peer w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          type="email"
          name="email"
          placeholder="example@web.de"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          Please provide a valid email!
        </span>
      </label>
      <label className="mb-5">
        Telefon
        <input
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
          type="tel"
          name="phone"
          id="phone"
          required
          placeholder="0123456789"
        />
      </label>
      <label className="mb-5">
        <span>Fehlerbeschreibung</span>
        <textarea
          name="description"
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 "
        />
      </label>
      <button
        className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        type="submit"
      >
        Reparaturauftrag erstellen
      </button>
    </form>
  );
}
