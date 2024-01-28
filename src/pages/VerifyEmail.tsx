import { useEffect } from "react";
import EmailAlert from "@/Alert/EmailAlert";
import { useSendEmailVerificationMutation } from "@/store/API/userAuthAPI";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [sendEmailVerification] = useSendEmailVerificationMutation();
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    try {
      await sendEmailVerification(null);
      toast.success("Verification Email sent successfully!");
    } catch (error) {
      toast.error("Error sending verification email");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // Redirect to the user's profile page after email verification
        navigate("/user");
      }
    });

    return () => {
      // Cleanup function
      unsubscribe();
    };
  }, [navigate]);

  return (
    <div>
      <EmailAlert action={handleResendEmail} />
    </div>
  );
};

export default VerifyEmail;
