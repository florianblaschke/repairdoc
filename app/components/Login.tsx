"use client";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <button onClick={() => signIn()} className="btn btn-circle">
      Login
    </button>
  );
}
