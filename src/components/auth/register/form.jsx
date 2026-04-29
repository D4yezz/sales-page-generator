"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { register } from "@/service/auth.service";

export function RegisterForm({ className, ...props }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await register({
      full_name: credential.full_name,
      email: credential.email,
      password: credential.password,
      confirm_password: credential.confirm_password,
    });

    if (credential.password !== credential.confirm_password) {
      toast.error("Password and confirm password do not match");
      setLoading(false);
      return;
    }

    if (!response.status) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    console.log(response);
    toast.success("Success register");
    setLoading(false);
    router.push("/auth/login");
  };

  return (
    <div className={cn("flex flex-col gap-6 w-[40vw]", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  value={credential.full_name}
                  onChange={handleChange}
                  name="full_name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={credential.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={credential.password}
                        onChange={handleChange}
                        required
                      />
                      <InputGroupAddon>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label={
                            showPassword ? "Hidden password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="confirm-password"
                        name="confirm_password"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={credential.confirm_password}
                        onChange={handleChange}
                        required
                      />
                      <InputGroupAddon>
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label={
                            showConfirm ? "Hidden password" : "Show password"
                          }
                        >
                          {showConfirm ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/auth/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
