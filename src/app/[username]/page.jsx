import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

export default function PublicProfilePage({ params }) {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/public/${params.username}`);
        if (!res.ok) {
          setError("Profile tidak ditemukan");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProfile(data.profile);
        setLinks(data.links || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Terjadi kesalahan");
        setLoading(false);
      }
    };

    if (params.username) {
      fetchProfile();
    }
  }, [params.username]);

  const handleLinkClick = async (link) => {
    try {
      await fetch(`/api/links/${link.id}`, { method: "POST" });
    } catch (err) {
      console.error("Error tracking click:", err);
    }
  };

  if (loading) {
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

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
        <div className="bg-[#16213e] border-4 border-[#ff4757] p-8 text-center">
          <div
            className="text-[#ff4757] font-['Press_Start_2P'] mb-4"
            style={{ fontSize: "12px" }}
          >
            404 ERROR
          </div>
          <div
            className="text-white font-['Press_Start_2P']"
            style={{ fontSize: "8px" }}
          >
            {error || "Profile tidak ditemukan"}
          </div>
        </div>
      </div>
    );
  }

  const themeColor = profile.theme_color || "#FF6B9D";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-['Press_Start_2P']"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <style jsx global>{`
        @keyframes pixelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pixelPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes pixelGlow {
          0%, 100% { box-shadow: 0 0 5px ${themeColor}, 0 0 10px ${themeColor}40; }
          50% { box-shadow: 0 0 10px ${themeColor}, 0 0 20px ${themeColor}60; }
        }
        .pixel-link:hover {
          animation: pixelPulse 0.3s ease-in-out;
        }
        .pixel-avatar {
          animation: pixelFloat 3s ease-in-out infinite;
        }
        .pixel-glow {
          animation: pixelGlow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-md">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="pixel-avatar mb-6">
            <div
              className="w-24 h-24 mx-auto border-4 flex items-center justify-center text-4xl pixel-glow"
              style={{
                borderColor: themeColor,
                backgroundColor: "#16213e",
                imageRendering: "pixelated",
              }}
            >
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <span style={{ fontSize: "32px" }}>🎮</span>
              )}
            </div>
          </div>

          {/* Display Name */}
          <h1
            className="mb-3"
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: themeColor,
            }}
          >
            {profile.display_name}
          </h1>

          {/* Username */}
          <div className="text-[#00d4ff] mb-4" style={{ fontSize: "10px" }}>
            @{profile.username}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p
              className="text-white mb-6 leading-relaxed"
              style={{ fontSize: "8px" }}
            >
              {profile.bio}
            </p>
          )}

          {/* Pixel Decoration */}
          <div className="flex justify-center gap-2 mb-8">
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: themeColor,
                imageRendering: "pixelated",
              }}
            ></div>
            <div
              className="w-3 h-3 bg-[#00d4ff]"
              style={{ imageRendering: "pixelated" }}
            ></div>
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: themeColor,
                imageRendering: "pixelated",
              }}
            ></div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="bg-[#16213e] border-4 border-[#FF6B9D] p-6 text-center">
              <p className="text-[#FF6B9D]" style={{ fontSize: "8px" }}>
                NO LINKS YET
              </p>
            </div>
          ) : (
            links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link)}
                className="block bg-[#16213e] border-4 hover:translate-y-[-4px] transition-all pixel-link"
                style={{
                  borderColor: themeColor,
                  imageRendering: "pixelated",
                }}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {link.icon && <span className="text-2xl">{link.icon}</span>}
                    <span className="text-white" style={{ fontSize: "10px" }}>
                      {link.title}
                    </span>
                  </div>
                  <ExternalLink size={16} style={{ color: themeColor }} />
                </div>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="text-[#00d4ff]" style={{ fontSize: "6px" }}>
            POWERED BY PIXEL LINKS
          </div>
        </div>
      </div>
    </div>
  );
}
