import StatusForm from "@/app/components/StatusForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import CommentForm from "@/app/components/CommentForm";
import { addImageToRepair, deleteComment, updateComment } from "@/lib/actions";
import ImgUpload from "@/app/components/ImgUpload";
import Gallery from "@/app/components/Gallery";
import DeleteRepair from "@/app/components/DeleteRepair";
import UpdateComment from "@/app/components/UpdateComment";

interface Props {
  params: { id: string };
}

export default async function RepairDetailPage({ params: { id } }: Props) {
  const data = await prisma.repair.findUnique({
    where: { id: id },
    include: { comments: true, images: true },
  });

  if (!data) return notFound();

  return (
    <main className="flex flex-col align-center min-h-screen p-24 mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl ml-20">
        <div className="card-body">
          <h2 className="card-title text-lg my-2 divider">Kundeninformation</h2>
          <div className="flex flex-col justify-between items-start gap-3 flex-wrap h-52">
            <span className="w-auto font-bold">Name:</span>
            <p className="text-sm">{data.firstName + " " + data.lastName}</p>
            <span className="w-auto font-bold">Mail:</span>
            <p className="text-sm">{data.email}</p>
            <span className="w-auto font-bold">Tel:</span>
            <p className="text-sm">
              {data.pre ? data.pre : 0}
              {data.phone}
            </p>
            <span className="w-auto font-bold">Straße:</span>
            <p className="text-sm">
              {data.street} {data.number}
            </p>
            <span className="w-auto font-bold">PLZ:</span>
            <p className="text-sm">{data.zip}</p>
            <span className="w-auto font-bold">Stadt:</span>
            <p className="text-sm">{data.city}</p>
            <span className="w-auto font-bold">Land:</span>
            <p className="text-sm">Land: {data.country}</p>
          </div>
          <div className="divider"></div>
          <div className="flex gap-1 items-center">
            <span className="font-bold">Angenommen:</span>
            <p className="font-sm text-sm">
              {data.createdAt?.toLocaleDateString("de-DE")}{" "}
            </p>
            <span className="font-bold">Ticket:</span>
            <p className="text-sm">{data.ticket}</p>
          </div>
          <StatusForm id={id} status={data.status} />
          <div className="flex justify-between divider">
            <CommentForm id={id} />
            <ImgUpload id={id} addImageToRepair={addImageToRepair} />
            <DeleteRepair id={id} />
          </div>
          <ul>
            {data.comments.map((comm) => (
              <li
                key={comm.id}
                className="flex flex-row rounded p-2 relative justify-between items-center w-full my-4 shadow-sm"
              >
                <p className="absolute top-0 text-xs">
                  {comm.createdBy} am{" "}
                  {comm.createdAt.toLocaleDateString("de-DE")}
                </p>
                {comm.text}
                <div className="flex flex-row-reverse gap-2">
                  <form action={deleteComment}>
                    <button
                      name="commentId"
                      value={comm.id}
                      className="btn btn-circle self-center"
                    >
                      X
                    </button>
                  </form>
                  <UpdateComment id={comm.id} text={comm.text} />
                </div>
              </li>
            ))}
          </ul>
          <Gallery data={data.images} />
        </div>
      </div>
    </main>
  );
}

{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
className="lucide lucide-pencil-line"
>
<path d="M12 20h9" />
<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
<path d="m15 5 3 3" />
</svg> */
}
