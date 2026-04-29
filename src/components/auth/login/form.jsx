"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { login } from "@/service/auth.service";
import { Eye, EyeOff, MailIcon, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const response = await login({ email, password });
    if (!response.status || response.status === null) {
      setIsLoading(false);
      toast.error(response.pesan || "Failed to login");
      return;
    }
    toast.success("Login success");
    setIsLoading(false);
    router.push(callbackUrl || "/dashboard");
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-cyan-sky p-4 font-instrument">
      {error && <p>{error}</p>}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 shadow-2xl rounded-lg bg-white"
      >
        <div className="mb-4 text-center flex flex-col justify-center items-center gap-2">
          <div className="rounded-full p-3 bg-linear-to-br from-gray-700 to-zinc-800 w-fit h-fit text-white">
            <MonitorSmartphone size={34} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Login</h1>
          <p className="text-slate-600 text-sm">
            Login with your email and password
          </p>
        </div>

        <div className="mb-6 text-zinc-800">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Email
          </label>
          <InputGroup>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputGroupAddon>
              <MailIcon className="text-slate-400" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="mb-6 text-zinc-800">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Password
          </label>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputGroupAddon>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hidden password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-linear-to-br from-gray-700 to-zinc-800 text-white font-medium py-2.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600">
          Don{`'`}t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
