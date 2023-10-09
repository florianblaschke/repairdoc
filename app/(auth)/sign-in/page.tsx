"use client";

import { signIn } from "next-auth/react";

const signInWithGoogle = async () => {
  try {
    await signIn("google");
  } catch (error) {
    return;
  }
};

export default function LoginForm() {
  return (
    <div>
      <h1 className="ml-40">Hello</h1>;
      <button onClick={() => signInWithGoogle()} className="btn btn-primary">
        Mit Google anmelden
      </button>
    </div>
  );
}
