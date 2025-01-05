"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/blogs");
  }, []);

  return (
    <div>
      <h1>Blog App</h1>
    </div>
  );
}
