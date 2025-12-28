import { Link2, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] font-['Press_Start_2P']">
      <style jsx global>{`
        @keyframes pixelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pixelRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pixelBlink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }
        .pixel-float {
          animation: pixelFloat 3s ease-in-out infinite;
        }
        .pixel-rotate {
          animation: pixelRotate 4s linear infinite;
        }
        .pixel-blink {
          animation: pixelBlink 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Icon */}
          <div className="pixel-float mb-8">
            <div
              className="inline-flex items-center justify-center w-32 h-32 bg-[#FF6B9D] border-4 border-[#ff8db3]"
              style={{ imageRendering: "pixelated" }}
            >
              <Link2 size={64} className="text-white pixel-rotate" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-[#FF6B9D] mb-6"
            style={{ fontSize: "20px", lineHeight: "1.8" }}
          >
            LINKYY
          </h1>

          {/* Subtitle */}
          <p
            className="text-white mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: "10px" }}
          >
            BUAT HALAMAN LINK PRIBADI KAMU DENGAN GAYA RETRO PIXEL ART. SATU
            LINK UNTUK SEMUA SOSIAL MEDIA KAMU!
          </p>

          {/* Pixel Decoration */}
          <div className="flex justify-center gap-2 mb-12">
            <div
              className="w-4 h-4 bg-[#FF6B9D] pixel-blink"
              style={{ imageRendering: "pixelated" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#00d4ff] pixel-blink"
              style={{ animationDelay: "0.5s", imageRendering: "pixelated" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#06FFA5] pixel-blink"
              style={{ animationDelay: "1s", imageRendering: "pixelated" }}
            ></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/account/signup"
              className="bg-[#FF6B9D] hover:bg-[#ff8db3] text-white px-8 py-4 border-4 border-[#ff8db3] transition-all active:translate-y-1 inline-block"
              style={{ fontSize: "10px", imageRendering: "pixelated" }}
            >
              [ START BUILD ]
            </a>
            <a
              href="/account/signin"
              className="bg-[#00d4ff] hover:bg-[#00b8d4] text-white px-8 py-4 border-4 border-[#00b8d4] transition-all active:translate-y-1 inline-block"
              style={{ fontSize: "10px", imageRendering: "pixelated" }}
            >
              [ LOGIN ]
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-[#16213e] border-4 border-[#FF6B9D] p-6">
              <div
                className="w-16 h-16 bg-[#FF6B9D] mx-auto mb-4 flex items-center justify-center"
                style={{ imageRendering: "pixelated" }}
              >
                <Sparkles size={32} className="text-white" />
              </div>
              <h3 className="text-[#FF6B9D] mb-3" style={{ fontSize: "8px" }}>
                RETRO STYLE
              </h3>
              <p
                className="text-white"
                style={{ fontSize: "6px", lineHeight: "1.8" }}
              >
                Design pixel art yang unik dan menarik
              </p>
            </div>

            <div className="bg-[#16213e] border-4 border-[#00d4ff] p-6">
              <div
                className="w-16 h-16 bg-[#00d4ff] mx-auto mb-4 flex items-center justify-center"
                style={{ imageRendering: "pixelated" }}
              >
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-[#00d4ff] mb-3" style={{ fontSize: "8px" }}>
                SUPER CEPAT
              </h3>
              <p
                className="text-white"
                style={{ fontSize: "6px", lineHeight: "1.8" }}
              >
                Buat halaman link dalam hitungan menit
              </p>
            </div>

            <div className="bg-[#16213e] border-4 border-[#06FFA5] p-6">
              <div
                className="w-16 h-16 bg-[#06FFA5] mx-auto mb-4 flex items-center justify-center"
                style={{ imageRendering: "pixelated" }}
              >
                <Link2 size={32} className="text-white" />
              </div>
              <h3 className="text-[#06FFA5] mb-3" style={{ fontSize: "8px" }}>
                UNLIMITED LINKS
              </h3>
              <p
                className="text-white"
                style={{ fontSize: "6px", lineHeight: "1.8" }}
              >
                Tambahkan link sebanyak yang kamu mau
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#16213e] border-t-4 border-[#FF6B9D] py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00d4ff]" style={{ fontSize: "6px" }}>
            © 2025 PIXEL LINKS - MADE WITH ♥ IN RETRO STYLE
          </p>
        </div>
      </div>
    </div>
  );
}
