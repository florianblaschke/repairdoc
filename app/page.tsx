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
    <main className="flex flex-col items-center justify-center ml-20 h-screen">
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">
            Schön, dass du hier bist. Logge dich ein um weiterzuarbeiten!
          </h1>
          <p>
            Du hast noch keinen Account? Dann klicke einfach auf den Knopf und
            erstelle dir ein Konto mit Google!
          </p>
          <div className="card-actions">
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-primary mt-4"
            >
              Mit Google anmelden
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
