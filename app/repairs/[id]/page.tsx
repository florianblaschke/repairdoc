import StatusForm from "@/app/components/StatusForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Modal from "@/app/components/Modal";
import CommentForm from "@/app/components/CommentForm";
import { deleteComment } from "@/lib/actions";

interface Props {
  params: { id: string };
}

export default async function RepairDetailPage({ params: { id } }: Props) {
  const data = await prisma.repair.findUnique({
    where: { id: id },
    include: { comments: true },
  });
  if (!data) return notFound();

  const translate: Record<string, string> = {
    accepted: "Accepted",
    progress: "In Progress",
    revalidate: "Contact customer",
    complete: "Complete",
  };

  return (
    <main className="flex flex-col align-center min-h-screen p-24 mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl ml-20">
        <figure></figure>
        <div className="card-body">
          <h2 className="customer">{data.firstName + " " + data.lastName}</h2>
          <p>Came in at: {data.createdAt?.toDateString()} </p>
          <p>Ticket: {data.ticket} </p>
          <p>Status: {translate[data.status]}</p>
          <StatusForm id={id} />
          <div className="card-actions justify-end">
            <Modal>{<CommentForm id={id} />}</Modal>
          </div>
          <ul>
            {data.comments.map((comm) => (
              <form
                action={deleteComment}
                className="flex flex-row justify-between w-full my-2"
              >
                <li key={comm.id}>{comm.text}</li>
                <button
                  name="commentId"
                  value={comm.id}
                  className="btn self-center"
                >
                  X
                </button>
              </form>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
