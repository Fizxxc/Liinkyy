import useAuth from "@/utils/useAuth";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4 font-['Press_Start_2P']">
      <div className="w-full max-w-md bg-[#16213e] border-4 border-[#FF6B9D] p-8 text-center">
        <div
          className="inline-flex items-center justify-center w-20 h-20 bg-[#ff4757] mb-6"
          style={{ imageRendering: "pixelated" }}
        >
          <LogOut size={40} className="text-white" />
        </div>

        <h1
          className="text-[#FF6B9D] mb-6"
          style={{ fontSize: "12px", lineHeight: "1.6" }}
        >
          LOGOUT GAME?
        </h1>

        <button
          onClick={handleSignOut}
          className="w-full bg-[#ff4757] hover:bg-[#ff6b81] text-white py-4 border-4 border-[#ff6b81] transition-all active:translate-y-1"
          style={{ fontSize: "10px", imageRendering: "pixelated" }}
        >
          [ KELUAR ]
        </button>

        <a
          href="/admin"
          className="block mt-4 text-[#00d4ff] hover:text-[#00b8d4]"
          style={{ fontSize: "8px" }}
        >
          KEMBALI
        </a>
      </div>
    </div>
  );
}
