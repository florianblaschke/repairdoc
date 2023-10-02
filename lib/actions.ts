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
