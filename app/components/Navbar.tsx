import prisma from "@/prisma/client";
import Link from "next/link";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import Logout from "./LogOut";
import { setOrgActive } from "@/lib/actions";

export default async function Navbar() {
  const session = await getAuthSession();

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  const allOrgForUser = await prisma.org.findMany({
    where: {
      OR: [
        { admin: user?.email! },
        { AND: { employeesId: { has: user?.id! } } },
      ],
    },
  });
  return (
    <div className="navbar z-40 flex flex-col items-center justify-evenly h-full fixed top-0 left-0 bg-yellow-300 w-20 min-w-min shadow-xl">
      {user?.orgActive && (
        <div className="dropdown dropdown-right">
          <label tabIndex={0} className="btn btn-circle">
            {user.orgActive.charAt(0).toUpperCase() +
              user.orgActive.charAt(user.orgActive.length - 1).toUpperCase()}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[40] menu p-2 shadow bg-base-100 rounded-box w-64"
          >
            {allOrgForUser.map((entry) => (
              <li key={entry.id}>
                <form
                  action={setOrgActive}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm font-medium">{entry.name}</span>
                  <button
                    className="btn btn-secondary"
                    name="orgName"
                    value={entry.name}
                  >
                    {user.orgActive === entry.name ? "Aktiv" : "Wechseln"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link href={"/dashboard"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-gauge"
        >
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
      </Link>
      <Link href={"/add"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Link>
      <Link href={"/repairs"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-wrench"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </Link>
      <Link href={"/dashboard"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </Link>
      <Link href="/settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-settings"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Link>
      {session && <Logout />}
    </div>
  );
}
