import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !username) {
      setError("Isi semua field!");
      setLoading(false);
      return;
    }

    // Store username for onboarding
    if (typeof window !== "undefined") {
      localStorage.setItem("pendingUsername", username);
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/admin/setup",
        redirect: true,
      });
    } catch (err) {
      setError("Email sudah terdaftar!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4 font-['Press_Start_2P']">
      <style jsx global>{`
        @keyframes pixelFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .pixel-container {
          animation: pixelFadeIn 0.5s ease-out;
        }
      `}</style>

      <div className="w-full max-w-md pixel-container">
        {/* Pixel Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 bg-[#00d4ff] mb-4"
            style={{ imageRendering: "pixelated" }}
          >
            <Sparkles size={40} className="text-white" />
          </div>
          <h1
            className="text-[#00d4ff] text-xl mb-2"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            CREATE ACCOUNT
          </h1>
          <div
            className="h-1 w-32 bg-[#00d4ff] mx-auto"
            style={{ imageRendering: "pixelated" }}
          ></div>
        </div>

        {/* Pixel Form Container */}
        <form
          onSubmit={onSubmit}
          className="bg-[#16213e] border-4 border-[#00d4ff] p-8"
        >
          <div className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                  )
                }
                className="w-full bg-[#0f3460] border-2 border-[#FF6B9D] text-white p-3 focus:outline-none focus:border-[#00d4ff] transition-colors"
                style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
                placeholder="pixelmaster"
                maxLength={20}
              />
              <p className="text-[#00d4ff] mt-2" style={{ fontSize: "6px" }}>
                Hanya huruf, angka, underscore
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#FF6B9D] text-white p-3 focus:outline-none focus:border-[#00d4ff] transition-colors"
                style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
                placeholder="pixel@mail.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#FF6B9D] text-white p-3 focus:outline-none focus:border-[#00d4ff] transition-colors"
                style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="bg-[#ff4757] border-2 border-[#ff6b81] p-3 text-white text-center"
                style={{ fontSize: "8px" }}
              >
                {error}
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4ff] hover:bg-[#00b8d4] text-white py-4 border-4 border-[#00b8d4] transition-all active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: "10px", imageRendering: "pixelated" }}
            >
              {loading ? "LOADING..." : "[ CREATE PLAYER ]"}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-[#FF6B9D] mb-2" style={{ fontSize: "8px" }}>
                SUDAH PUNYA AKUN?
              </p>
              <a
                href="/account/signin"
                className="text-[#00d4ff] hover:text-[#00b8d4] underline"
                style={{ fontSize: "8px" }}
              >
                LOGIN DISINI
              </a>
            </div>
          </div>
        </form>

        {/* Pixel Footer Decoration */}
        <div className="mt-6 flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-[#00d4ff]"
            style={{ imageRendering: "pixelated" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#FF6B9D]"
            style={{ imageRendering: "pixelated" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#00d4ff]"
            style={{ imageRendering: "pixelated" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
