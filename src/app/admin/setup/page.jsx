import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Palette } from "lucide-react";

export default function SetupPage() {
  const { data: user, loading: userLoading } = useUser();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [themeColor, setThemeColor] = useState("#FF6B9D");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingUsername = localStorage.getItem("pendingUsername");
      if (pendingUsername) {
        setUsername(pendingUsername);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !displayName) {
      setError("Username dan Display Name wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          display_name: displayName,
          bio,
          theme_color: themeColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal membuat profile");
      }

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("pendingUsername");
        window.location.href = "/admin";
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div
          className="text-[#FF6B9D] font-['Press_Start_2P']"
          style={{ fontSize: "10px" }}
        >
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4 font-['Press_Start_2P']">
      <style jsx global>{`
        @keyframes pixelSlide {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .pixel-slide {
          animation: pixelSlide 0.5s ease-out;
        }
      `}</style>

      <div className="w-full max-w-2xl pixel-slide">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 bg-[#00d4ff] mb-4"
            style={{ imageRendering: "pixelated" }}
          >
            <Palette size={40} className="text-white" />
          </div>
          <h1
            className="text-[#00d4ff] text-xl mb-2"
            style={{ fontSize: "14px", lineHeight: "1.6" }}
          >
            SETUP PROFILE
          </h1>
          <div
            className="h-1 w-48 bg-[#00d4ff] mx-auto"
            style={{ imageRendering: "pixelated" }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#16213e] border-4 border-[#00d4ff] p-8"
        >
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                USERNAME (URL: /{username || "username"})
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
                style={{ fontFamily: "monospace" }}
                placeholder="pixelmaster"
                maxLength={20}
              />
            </div>

            {/* Display Name */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#FF6B9D] text-white p-3 focus:outline-none focus:border-[#00d4ff] transition-colors"
                style={{ fontFamily: "monospace" }}
                placeholder="Pixel Master"
                maxLength={50}
              />
            </div>

            {/* Bio */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                BIO (OPTIONAL)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#0f3460] border-2 border-[#FF6B9D] text-white p-3 focus:outline-none focus:border-[#00d4ff] transition-colors h-24 resize-none"
                style={{ fontFamily: "monospace" }}
                placeholder="Gamer & Creator"
                maxLength={200}
              />
            </div>

            {/* Theme Color */}
            <div>
              <label
                className="block text-[#FF6B9D] mb-3"
                style={{ fontSize: "8px" }}
              >
                THEME COLOR
              </label>
              <div className="flex gap-3">
                {[
                  "#FF6B9D",
                  "#00d4ff",
                  "#9D4EDD",
                  "#06FFA5",
                  "#FFD93D",
                  "#FF6B6B",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setThemeColor(color)}
                    className={`w-12 h-12 border-4 transition-all ${
                      themeColor === color
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color,
                      imageRendering: "pixelated",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="bg-[#ff4757] border-2 border-[#ff6b81] p-3 text-white text-center"
                style={{ fontSize: "8px" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4ff] hover:bg-[#00b8d4] text-white py-4 border-4 border-[#00b8d4] transition-all active:translate-y-1 disabled:opacity-50"
              style={{ fontSize: "10px" }}
            >
              {loading ? "SAVING..." : "[ SAVE & START ]"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
