import Principal from "./Pages/Principal";
import { useState, useCallback } from "react";
import Toast from "./Components/Toast";

const App = () => {
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({ message, type, onClose: () => setToast(null) });
    },
    []
  );

  return (
    <div>
      {toast && <Toast {...toast} />}
      <Principal showToast={showToast} />
    </div>
  );
};

export default App;
