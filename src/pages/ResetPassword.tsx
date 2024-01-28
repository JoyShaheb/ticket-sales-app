import React, { useState, FormEvent } from "react";
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
import { useSetNewPassWordMutation } from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const initialState: Pick<IUserSignInData, "password"> = {
    password: "",
  };
  const [data, setData] = useState(initialState);

  const oobCode = new URLSearchParams(window.location.search).get(
    "oobCode"
  ) as string;

  const [setNewPassWord] = useSetNewPassWordMutation();

  const handleRseetPassword = async (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      setNewPassWord({
        oobCode,
        password: data.password,
      })
        .unwrap()
        .then(() => setData(initialState))
        .then(() => navigate("/login")),
      {
        loading: "Resetting password...",
        success: "Password Reset successful",
        error: "Failed to reset password!",
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="max-w-[320px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            Select a strong password of minimum 6 characters
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRseetPassword}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Enter your new password</Label>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                name="password"
                value={data.password}
                required
                placeholder="m@example.com"
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
              <Button type="submit" className="w-full mt-2">
                Confirm
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
