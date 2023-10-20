import { setOrgActive } from "@/lib/actions";
import { Org, User } from "@prisma/client";
import Members from "./Members";
import DeleteOrg from "./DeleteOrg";

type orgsWithUsers = {
  id: string;
  name: string;
  admin: string;
  employees: User[];
};

export default function OrgList({
  adminAtOrgs,
  user,
  text,
}: {
  adminAtOrgs: orgsWithUsers[];
  user:
    | ({
        employeeAt: Org[];
      } & User)
    | null;
  text: string;
}) {
  if (user?.employeeAtId.length === 0 && user.orgActive === null)
    return (
      <>
        <br />
        <span className="text-sm font-medium">
          Du hast noch kein eigenes Team erstellt.
        </span>
      </>
    );

  return (
    <ul className="p-8">
      <span className="text-lg font-bold">{text}</span>
      {adminAtOrgs.map((entry) => (
        <li className="border rounded-md p-1 m-1 w-full" key={entry.id}>
          <div className="flex justify-between items-center gap-2">
            <form
              action={setOrgActive}
              className="flex justify-between items-center gap-2 w-full"
            >
              <span className="text-sm font-medium flex-1">{entry.name}</span>
              <button
                className="btn btn-secondary"
                name="orgName"
                value={entry.name}
              >
                {user?.orgActive === entry.name ? "Aktiv" : "Wechseln"}
              </button>
            </form>
            <Members members={entry.employees} orgName={entry.name} />
            <DeleteOrg user={user?.email!} orgName={entry.name} />
          </div>
        </li>
      ))}
    </ul>
  );
}
