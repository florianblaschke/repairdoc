import StatusForm from "@/app/components/StatusForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import CommentForm from "@/app/components/CommentForm";
import { addImageToRepair, deleteComment } from "@/lib/actions";
import ImgUpload from "@/app/components/ImgUpload";
import Gallery from "@/app/components/Gallery";

interface Props {
  params: { id: string };
}

export default async function RepairDetailPage({ params: { id } }: Props) {
  const data = await prisma.repair.findUnique({
    where: { id: id },
    include: { comments: true, images: true },
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
          <div className="flex flex-col gap-2 ">
            <h2 className="card-title text-lg my-2 divider">
              Kundeninformation
            </h2>
            <p>Name: {data.firstName + " " + data.lastName}</p>
            <p>Email: {data.email}</p>
            <p>Tel: +49 {data.phone}</p>
          </div>
          <div className="divider"></div>
          <p>Angenommen: {data.createdAt?.toDateString()} </p>
          <p>Ticket: {data.ticket} </p>
          <StatusForm id={id} status={data.status} />
          <div className="flex justify-between divider">
            <CommentForm id={id} />
            <ImgUpload id={id} addImageToRepair={addImageToRepair} />
          </div>
          <ul>
            {data.comments.map((comm) => (
              <li
                key={comm.id}
                className="flex flex-row rounded p-2 relative justify-between items-center w-full my-4 shadow-sm"
              >
                <p className="absolute top-0 text-xs">
                  Florian am {comm.createdAt.toDateString()}
                </p>
                {comm.text}
                <form action={deleteComment}>
                  <button
                    name="commentId"
                    value={comm.id}
                    className="btn btn-circle self-center"
                  >
                    X
                  </button>
                </form>
              </li>
            ))}
          </ul>
          <Gallery data={data.images} />
        </div>
      </div>
    </main>
  );
}
