import { RxRocket } from "react-icons/rx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const EmailAlert = ({ action }: { action: () => void }) => {
  return (
    <div className="container max-w-7xl">
      <Alert variant="destructive">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <RxRocket className="h-4 w-4" />
            <div className="">
              <AlertTitle>Email Verification Required</AlertTitle>
              <AlertDescription>
                Please verify your email address to continue using the app.
              </AlertDescription>
            </div>
          </div>
          <Button onClick={action} variant="destructive" size="sm">
            Send Email
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default EmailAlert;
