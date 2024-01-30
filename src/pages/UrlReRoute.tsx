import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UrlReRoute = () => {
  const navigate = useNavigate();
  // Get the URL queries

  // enum -> "resetPassword" | "verifyEmail"

  const searchParams = new URLSearchParams(useLocation().search);
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const apiKey = searchParams.get("apiKey");
  const continueUrl = searchParams.get("continueUrl");
  const lang = searchParams.get("lang");

  useEffect(() => {
    if (mode === "resetPassword") {
      navigate(
        `/reset-password?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&continueUrl=${continueUrl}&lang=${lang}`
      );
    } else if (mode === "verifyEmail") {
      navigate(
        `/verify-email-request?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&continueUrl=${continueUrl}&lang=${lang}`
      );
    }
  }, []);

  return <div>Re routing to request, please wait......</div>;
};

export default UrlReRoute;
