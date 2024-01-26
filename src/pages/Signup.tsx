import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
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
import { IUserSignInData } from "@/types/interface";
import { useEmailSignupMutation, useGoogleSignupMutation } from "@/store";
import { toast } from "sonner";

const Signup = () => {
  const initialState: IUserSignInData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [emailSignup] = useEmailSignupMutation();
  const [googleSignup] = useGoogleSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(emailSignup(data).unwrap(), {
      loading: "Creating user...",
      success: () => {
        // Successfully created user, now navigate to /login
        navigate("/login");
        return "Successfully created user!";
      },
      error: (err) => err,
    });
  };

  const GoogleAuth = async () => {
    toast.promise(googleSignup(null).unwrap(), {
      loading: "Creating user...",
      success: "Successfully created user!",
      error: (err) => err,
    });
  };
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="max-w-[320px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                // type="text"
                name="email"
                value={data.email}
                required
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <FaGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button onClick={GoogleAuth} variant="outline">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
              <Button type="submit" className="w-full">
                Create account
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="link"
                className="flex gap-1 w-full"
              >
                <span>Have an account?</span>
                <span className="text-blue-500">Login</span>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
