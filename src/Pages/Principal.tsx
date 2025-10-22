import AppRoutes from "../Routes/AppRoutes";
export default function Principal({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  return (
    <div>
      <div className="w-full max-w-4xl mx-auto">
        <AppRoutes showToast={showToast} />
      </div>
    </div>
  );
}
