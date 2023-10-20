"use server";

import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { inherits } from "util";
import { z } from "zod";

export async function createRepair(data: FormData) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  const activeOrg = await prisma.org.findFirst({
    where: { name: user?.orgActive! },
  });

  const schema = z.object({
    ticket: z.coerce.number(),
    order: z.coerce.number(),
    type: z.string(),
    model: z.string(),
    serial: z.string(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    pre: z.string(),
    phone: z.coerce.number(),
    street: z.string().nonempty(),
    number: z.string().nonempty(),
    zip: z.coerce.number(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
    description: z.string(),
  });
  try {
    const parseRepair = schema.parse({
      ticket: data.get("ticket"),
      order: data.get("order"),
      type: data.get("type"),
      model: data.get("model"),
      serial: data.get("serial"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      pre: data.get("pre"),
      phone: data.get("phone")?.toString().replaceAll(" ", ""),
      street: data.get("street"),
      number: data.get("housenumber"),
      zip: data.get("zip"),
      city: data.get("city"),
      country: data.get("country"),
      description: data.get("description"),
    });

    const newRepair = await prisma.repair.create({
      data: {
        ticket: parseRepair.ticket,
        order: parseRepair.order,
        type: parseRepair.type,
        model: parseRepair.model,
        serial: parseRepair.serial,
        firstName: parseRepair.firstName,
        lastName: parseRepair.lastName,
        email: parseRepair.email,
        phone: parseRepair.phone,
        street: parseRepair.street,
        pre: parseRepair.pre,
        number: parseRepair.number,
        zip: parseRepair.zip,
        city: parseRepair.city,
        country: parseRepair.country,
        description: parseRepair.description,
        orgId: activeOrg?.id,
      },
    });

    revalidatePath("/");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError)
      return console.log("Error while validating", error.message);
    if (error instanceof Error) return console.log(error.message);
    return;
  } finally {
    redirect("/dashboard");
  }
}

export async function deleteRepair(data: FormData) {
  const session = await getAuthSession();
  if (!session) redirect("/");

  const schema = z.object({
    id: z.string().nonempty(),
  });
  try {
    const validId = schema.parse({
      id: data.get("id"),
    });
    await prisma.repair.delete({
      where: {
        id: validId.id,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/repairs");
  } catch (error) {
    if (error instanceof z.ZodError)
      return console.log("Error while validating", error.message);
    if (error instanceof Error) return console.log(error.message);
    return;
  }
}

export async function setStatus(data: string, id: string) {
  const schema = z.object({
    status: z.string(),
  });

  const status = schema.parse({
    status: data,
  });

  const newStatus = await prisma.repair.update({
    where: { id: id },
    data: {
      status: status.status,
    },
  });

  revalidatePath(`/repairs/${id}`);
  revalidatePath("/dashboard");
}

export async function addComment(data: FormData, id: string) {
  const session = await getAuthSession();
  if (!session) return redirect("/");
  const schema = z.object({
    comment: z.string().nonempty().max(250),
  });

  const validComment = schema.parse({
    comment: data.get("comment"),
  });

  const newComment = await prisma.comment.create({
    data: {
      text: validComment.comment,
      repairId: id,
      createdBy: session.user.name,
    },
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

export async function updateComment(data: FormData, id: string) {
  const schema = z.object({
    commentId: z.string().length(24),
    comment: z.string().nonempty(),
  });

  try {
    const validUpdate = schema.parse({
      comment: data.get("comment"),
      commentId: id,
    });

    await prisma.comment.update({
      where: { id },
      data: {
        text: validUpdate.comment,
      },
    });
    revalidatePath(`/repairs/${id}`);
  } catch (error) {
    if (error instanceof z.ZodError)
      return console.log("Error while validating", error.message);
    if (error instanceof Error) return console.log(error.message);
    return;
  }
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

export async function createToDo(data: FormData) {
  const session = await getAuthSession();
  const schema = z.object({
    task: z.string().nonempty(),
  });
  try {
    const validToDo = schema.parse({
      task: data.get("todo"),
    });

    const activeUser = await prisma.user.findFirst({
      where: { email: session?.user?.email },
    });
    const activeOrg = await prisma.org.findUnique({
      where: { name: activeUser?.orgActive! },
    });

    const newToDo = await prisma.todo.create({
      data: {
        task: validToDo.task,
        createdBy: session?.user?.name,
        orgId: activeOrg?.id,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof Error) return { message: "Something bad happened" };
  }
}

export async function deleteToDo(data: FormData) {
  const schema = z.object({
    todo: z.string().nonempty(),
  });

  try {
    const validTodo = schema.parse({
      todo: data.get("todo"),
    });

    await prisma.todo.delete({
      where: {
        id: validTodo.todo,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { message: "Something bad happened" };
  }

  revalidatePath("/dashboard");
}

export async function createOrg(data: FormData) {
  const session = await getAuthSession();
  const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
  });
  try {
    const validOrg = schema.parse({
      name: data.get("name"),
      email: session?.user?.email,
    });

    const newOrg = await prisma.org.create({
      data: {
        name: validOrg.name,
        admin: validOrg.email!,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    if (error instanceof z.ZodError)
      return { message: "Not a valid org name!" };
    if (error instanceof Error)
      return { message: "Something went terribly wrong..." };
  }
}

export async function setOrgActive(data: FormData) {
  const session = await getAuthSession();
  const schema = z.object({
    orgName: z.string().nonempty(),
    user: z.string().nonempty(),
  });
  try {
    const validOrgAndUser = schema.parse({
      orgName: data.get("orgName"),
      user: session?.user?.email,
    });

    const newOrgActive = await prisma.user.update({
      where: { email: validOrgAndUser.user },
      data: {
        orgActive: validOrgAndUser.orgName,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Zod Error while validating");
    }

    if (error instanceof Error) {
      console.log("Error while setting status");
    }
  }
}

export async function inviteMember(data: FormData) {
  const schema = z.object({
    email: z.string().nonempty({ message: "email not valid" }),
    orgName: z.string().nonempty({ message: "org not valid" }),
  });

  try {
    const validReq = schema.parse({
      email: data.get("email"),
      orgName: data.get("orgName"),
    });
    const validUser = await prisma.user.findFirst({
      where: { email: validReq.email },
    });

    const validOrg = await prisma.org.findFirst({
      where: { name: validReq.orgName },
    });
    if (!validUser || !validOrg) return;

    await prisma.user.update({
      where: { id: validUser.id },
      data: { employeeAtId: { push: validOrg.id } },
    });
    const updatedOrg = await prisma.org.update({
      where: { name: validReq.orgName },
      data: {
        employeesId: {
          push: validUser.id,
        },
      },
    });
    revalidatePath("/settings");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Zod Error while validating");
    }

    if (error instanceof Error) {
      console.log("Error while setting new Employee!");
    }
  }
}

export async function deleteOrg(data: FormData) {
  const schema = z.object({
    user: z.string().nonempty(),
    orgName: z.string().nonempty(),
  });

  try {
    const validReq = schema.parse({
      user: data.get("user"),
      orgName: data.get("orgName"),
    });

    const orgToDelete = await prisma.org.delete({
      where: { name: validReq.orgName, admin: validReq.user },
      include: { employees: true },
    });

    orgToDelete.employees.map(async (employee) => {
      const filtered = employee.employeeAtId.filter(
        (id) => id !== orgToDelete.id
      );
      await prisma.user.update({
        where: { id: employee.id },
        data: { employeeAtId: [...filtered] },
      });
    });

    revalidatePath("/settings");
  } catch (error) {
    if (error instanceof Error)
      return console.log("Error during database call");
    if (error instanceof z.ZodError)
      return console.log("Error during validation");
  }
}

export async function kickUser(data: FormData) {
  const schema = z.object({
    userId: z.string().nonempty(),
    orgName: z.string().nonempty(),
  });
  try {
    const validReq = schema.parse({
      userId: data.get("userId"),
      orgName: data.get("orgName"),
    });

    const orgWhereKicked = await prisma.org.findUnique({
      where: { name: validReq.orgName },
      include: { employees: true },
    });

    if (!orgWhereKicked) return;

    const filteredOrg = orgWhereKicked.employeesId.filter(
      (id) => id !== validReq.userId
    );
    const userToKick = orgWhereKicked.employees.find(
      (employee) => employee.id === validReq.userId
    );
    const filteredUser = userToKick?.employeeAtId.filter(
      (id) => id !== orgWhereKicked.id
    );

    await prisma.org.update({
      where: { id: orgWhereKicked.id },
      data: { employeesId: [...filteredOrg!] },
    });

    await prisma.user.update({
      where: { id: validReq.userId },
      data: { employeeAtId: [...filteredUser!] },
    });

    revalidatePath("/settings");
  } catch (error) {
    if (error instanceof Error) return console.log("Error with Database");
    if (error instanceof z.ZodError)
      return console.log("Error while validating");
  }
}
