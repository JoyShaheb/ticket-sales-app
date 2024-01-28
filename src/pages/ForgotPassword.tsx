import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUserSignInData } from "@/types/interface";
import { useSendResetPassWordEmailMutation } from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const initialState: Pick<IUserSignInData, "email"> = {
    email: "",
  };

  const [data, setData] = useState(initialState);

  const [sendResetPassWordEmail] = useSendResetPassWordEmailMutation();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      sendResetPassWordEmail({
        email: data.email,
      })
        .unwrap()
        .then(() => setData(initialState))
        .then(() => navigate("/login")),
      {
        loading: "Sending email...",
        success: "Email Sent! Please Check your Mail",
        error: "Failed to send email!",
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="max-w-[320px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password Reset Email</CardTitle>
          <CardDescription>
            Our servers will send password reset link to your email within 2
            minutes
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordReset}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                name="email"
                value={data.email}
                required
                placeholder="m@example.com"
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
              <Button type="submit" className="w-full mt-2">
                Send Email
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
