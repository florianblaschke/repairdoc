"use server";

import { z } from "zod";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRepair(data: FormData) {
  const schema = z.object({
    ticket: z.coerce.number(),
    order: z.coerce.number(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    phone: z.coerce.number(),
    description: z.string(),
  });

  const parseRepair = schema.parse({
    ticket: data.get("ticket"),
    order: data.get("order"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    phone: data.get("phone"),
    description: data.get("description"),
  });

  const newRepair = await prisma.repair.create({
    data: {
      ticket: parseRepair.ticket,
      order: parseRepair.order,
      firstName: parseRepair.firstName,
      lastName: parseRepair.lastName,
      email: parseRepair.email,
      phone: parseRepair.phone,
      description: parseRepair.description,
    },
  });

  if (newRepair) {
    revalidatePath("/");
    redirect("/");
  }
}

export async function setStatus(data: FormData, id: string) {
  const schema = z.object({
    status: z.string(),
  });

  const status = schema.parse({
    status: data.get("status"),
  });

  const newStatus = await prisma.repair.update({
    where: { id: id },
    data: {
      status: status.status,
    },
  });

  revalidatePath(`/repairs/${id}`);
  revalidatePath("/");
}

export async function addComment(data: FormData, id: string) {
  const schema = z.object({
    comment: z.string().nonempty().max(250),
  });

  const validComment = schema.parse({
    comment: data.get("comment"),
  });

  const newComment = await prisma.comment.create({
    data: { text: validComment.comment, repairId: id },
  });

  revalidatePath(`/repairs/${id}`);
}

export async function deleteComment(data: FormData) {
  const schema = z.object({
    commentId: z.string().length(24),
  });
  const id = schema.parse({
    commentId: data.get("commentId"),
  });

  const commentToDelete = await prisma.comment.findUnique({
    where: { id: id.commentId },
  });
  await prisma.comment.delete({ where: { id: commentToDelete!.id } });
  revalidatePath(`/repairs/${commentToDelete?.repairId}`);
}

export async function addImageToRepair(imageId: string, repairId: string) {
  const schema = z.object({
    imageId: z.string().nonempty(),
    repairId: z.string().nonempty(),
  });

  const validId = schema.parse({
    imageId: imageId,
    repairId: repairId,
  });

  const newImage = await prisma.images.create({
    data: { path: imageId, repairId: repairId },
  });
  revalidatePath(`/repairs/${repairId}`);
}
