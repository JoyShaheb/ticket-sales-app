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
import { useNavigate } from "react-router-dom";
import InputField from "@/components/Form/InputField";
import {
  HTMLFormChangeEventType,
  InputChangeEventType,
} from "@/types/interface";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleSubmit = async (e: HTMLFormChangeEventType) => {
    e.preventDefault();
  };

  const handleInputChange = (e: InputChangeEventType) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="max-w-[320px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <InputField
              name="email"
              onChange={handleInputChange}
              placeholder="m@example.com"
              required
              type="email"
              value={user.email}
              label="Email"
            />
            <div className="">
              <InputField
                label="Password"
                name="password"
                onChange={handleInputChange}
                placeholder="m@example.com"
                required
                type="password"
                value={user.password}
              />
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
              <Button variant="outline">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
              <Button
                type="submit"
                className="w-full"
                onClick={() => navigate("/User")}
              >
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
