import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Gamepad2 } from "lucide-react";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Isi semua field!");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/admin",
        redirect: true,
      });
    } catch (err) {
      setError("Email atau password salah!");
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
        @keyframes pixelPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 107, 157, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 107, 157, 0);
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
            className="inline-flex items-center justify-center w-20 h-20 bg-[#FF6B9D] mb-4"
            style={{ imageRendering: "pixelated" }}
          >
            <Gamepad2 size={40} className="text-white" />
          </div>
          <h1
            className="text-[#FF6B9D] text-xl mb-2"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            LOGIN AKUN LINKY
          </h1>
          <div
            className="h-1 w-32 bg-[#FF6B9D] mx-auto"
            style={{ imageRendering: "pixelated" }}
          ></div>
        </div>

        {/* Pixel Form Container */}
        <form
          onSubmit={onSubmit}
          className="bg-[#16213e] border-4 border-[#FF6B9D] p-8"
        >
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                className="block text-[#00d4ff] mb-3"
                style={{ fontSize: "8px" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#00d4ff] text-white p-3 focus:outline-none focus:border-[#FF6B9D] transition-colors"
                style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
                placeholder="example@linky.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-[#00d4ff] mb-3"
                style={{ fontSize: "8px" }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#00d4ff] text-white p-3 focus:outline-none focus:border-[#FF6B9D] transition-colors"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B9D] hover:bg-[#ff8db3] text-white py-4 border-4 border-[#ff8db3] transition-all active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: "10px", imageRendering: "pixelated" }}
            >
              {loading ? "LOADING..." : "[ START GAME ]"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-[#00d4ff] mb-2" style={{ fontSize: "8px" }}>
                BELUM PUNYA AKUN?
              </p>
              <a
                href="/account/signup"
                className="text-[#FF6B9D] hover:text-[#ff8db3] underline"
                style={{ fontSize: "8px" }}
              >
                REGISTER DISINI
              </a>
            </div>
          </div>
        </form>

        {/* Pixel Footer Decoration */}
        <div className="mt-6 flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-[#FF6B9D]"
            style={{ imageRendering: "pixelated" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#00d4ff]"
            style={{ imageRendering: "pixelated" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#FF6B9D]"
            style={{ imageRendering: "pixelated" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
