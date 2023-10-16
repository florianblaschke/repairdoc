import { createRepair } from "@/lib/actions";

export default function NewRepairForm() {
  return (
    <form
      action={createRepair}
      className="bg-white rounded-md p-5 md:p-10 flex flex-col flex-wrap w-full group lg:w-1/2"
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
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow shadow-gray-100 appearance-none outline-none text-neutral-800 "
          type="number"
          name="order"
          placeholder="Optional"
        />
      </label>
      <label className="mb-5">
        Vorname
        <input
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
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
        <div className="join w-full">
          <select
            className="select join-item select-bordered h-auto"
            name="pre"
            id="pre"
          >
            <option value="+49">+49</option>
            <option value="+43">+43</option>
          </select>
          <input
            className="w-full border join-item rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="tel"
            name="phone"
            id="phone"
            required
            placeholder="123456789"
          />
        </div>
      </label>
      <div className="flex flex-row flex-wrap justify-between items-center gap-1">
        <span className="w-full divider">Adresse</span>
        <label className="mb-5 flex-auto">
          Straße
          <input
            className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="text"
            name="street"
            id="street"
            required
            placeholder="Musterstraße"
          />
          <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please provide a valid email!
          </span>
        </label>
        <label className="mb-5 flex-auto">
          Hausnummer
          <input
            className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="text"
            name="housenumber"
            id="housenumber"
            required
            placeholder="2a"
          />
          <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please provide a valid email!
          </span>
        </label>
        <label className="mb-5 flex-3">
          PLZ
          <input
            className="peer w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="text"
            name="zip"
            id="zip"
            required
            placeholder="01234"
            minLength={5}
          />
          <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Postleitzahlen in Deutschland sind 5-stellig!
          </span>
        </label>
        <label className="mb-5 flex-auto">
          Ort
          <input
            className="peer w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="text"
            name="city"
            id="city"
            required
            placeholder="Musterdorf"
          />
          <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Bitte gib einen Ort an.
          </span>
        </label>
        <label className="mb-5 flex-auto">
          Land
          <input
            className="peer w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
            type="text"
            name="country"
            id="country"
            required
            placeholder="Musterland"
          />
          <span className="hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Bitte gib das Land ein.
          </span>
        </label>
      </div>
      <label className="mb-5">
        <span className="divider">Fehlerbeschreibung</span>
        <textarea
          name="description"
          className="w-full border rounded border-gray-300 bg-inherit p-3 shadow  shadow-gray-100 appearance-none outline-none text-neutral-800 "
        />
      </label>
      <button
        className="btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-50"
        type="submit"
      >
        Reparaturauftrag erstellen
      </button>
    </form>
  );
}
