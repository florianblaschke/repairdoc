"use server";

export async function createRepair(event: FormData) {
  const ticket = event.get("ticket");
  const order = event.get("order");
  const firstName = event.get("firstName");
  const lastName = event.get("lastName");
  const email = event.get("email");
  const phone = event.get("phone");
  const description = event.get("description");

  const data = {
    ticket,
    order,
    firstName,
    lastName,
    email,
    phone,
    description,
  };

  console.log(data);
}
