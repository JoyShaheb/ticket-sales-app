import { useState } from "react";
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
import { toast } from "sonner";
import { IUserSignInData } from "@/types/interface";
import { useEmailLoginMutation, useGoogleSignupMutation } from "@/store";
import { Loader2 } from "lucide-react";
import { GoogleAuthType } from "../types/types";

const Login = () => {
  const initialState: IUserSignInData = {
    email: "kibeyid597@alibrs.com",
    password: "111111",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [emailLogin] = useEmailLoginMutation();
  const [googleSignup] = useGoogleSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Logging in, Please wait...", {
      icon: (
        <Loader2 className="h-[20px] w-[20px] animate-spin text-[#26AC9B]" />
      ),
    });
    emailLogin(data)
      .unwrap()
      .then(() => {
        toast.success("Success!", {
          description: "Logged in Successfully",
        });
      })
      .then(() => {
        setData(initialState);
        // Navigate to /user after successful login
        navigate("/user");
      })
      .catch((err: string) => {
        toast.error("Unable to login...", {
          description: err,
        });
      });
  };

  const GoogleAuth: GoogleAuthType = async () =>
    toast.promise(googleSignup(null).unwrap(), {
      loading: "Logging in...",
      success: "Successfully Logged in!",
      error: "Unable to login!",
    });
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="max-w-[320px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                name="email"
                value={data.email}
                required
                placeholder="m@example.com"
              />
            </div>
            <div className="">
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
              <div className="font-semibold cursor-pointer hover:underline text-xs">
                Reset password
              </div>
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
                Login User
              </Button>
              <Button
                variant="link"
                className="flex gap-1 w-full"
                onClick={() => navigate("/signup")}
              >
                <span>Don't have account?</span>
                <span className="text-blue-500">Signup</span>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
