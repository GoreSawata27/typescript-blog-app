"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import _noAuth from "@/utils/_noAuth";
import { EType, FormType } from "@/type";
import { toastWarning } from "@/components/toast-msg/toastWarning";
import { toastError } from "@/components/toast-msg/toastError";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleKeyDown = (e: EType): void => {
    if (e.key === " " && (email === "" || password === "")) {
      e.preventDefault();
    }
  };

  // Change the type here to React.FormEvent<HTMLFormElement>
  const signIn = async (e: FormType): Promise<void> => {
    e.preventDefault();
    if (email === "" || password === "") {
      toastWarning("Please enter email and password");

      return;
    }
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|mil|int|info|biz|name|pro|coop|museum|aero|jobs|travel|xxx|us|uk|in|ca|au|de|jp|fr|cn|ru|br|za|mx|es|it|nl|se|ch|ae|sg|app|blog|online|site|tech|store|io|ai|me|dev|asia|africa|eu|club|shop|news|photo|music|movie|law)$/i;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toastWarning("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await _noAuth.post("/api/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("jwtToken", res.data?.token);
      localStorage.setItem("Name", res.data?.name);
      localStorage.setItem("Email", res.data?.email);

      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      const errors = error.response?.data?.message || "Something went wrong";
      toastError(errors);
      console.error("Error during signin:", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={signIn}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="yourmail@example.com"
                      value={email}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      placeholder="******"
                      type="password"
                      value={password}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? "LoginIn..." : "Login"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?
                  <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
