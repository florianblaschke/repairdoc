import { createRepair } from "@/lib/db-functions";

export default function NewRepairForm() {
  return (
    <form
      action={createRepair}
      className="flex flex-col p-2 gap-2 items-center"
    >
      <label className="join join-item bg-slate-400">
        Ticketnummer
        <input
          className="border-solid border-2 join-item"
          type="text"
          name="ticket"
        />
      </label>
      <label>
        Bestellnummer
        <input className="border-solid border-2" type="number" name="order" />
      </label>
      <label>
        Vorname
        <input className="border-solid border-2" type="text" name="firstName" />
      </label>
      <label>
        Nachname
        <input className="border-solid border-2" type="text" name="lastName" />
      </label>
      <label>
        E-Mail
        <input className="border-solid border-2" type="email" name="email" />
      </label>
      <label>
        Telefon
        <input
          className="border-solid border-2"
          type="tel"
          name="phone"
          id="phone"
        />
      </label>
      <label>
        <textarea name="description" />
      </label>
      <button className="btn border-solid rounded-sm" type="submit">
        Reparaturauftrag erstellen
      </button>
    </form>
  );
}
