import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({ title: "", url: "", icon: "" });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [profileRes, linksRes] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/links"),
      ]);

      if (!profileRes.ok && profileRes.status === 401) {
        window.location.href = "/account/signin";
        return;
      }

      const profileData = await profileRes.json();
      const linksData = await linksRes.json();

      if (!profileData.profile) {
        window.location.href = "/admin/setup";
        return;
      }

      setProfile(profileData.profile);
      setLinks(linksData.links || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", url: "", icon: "" });
        setShowAddModal(false);
        fetchData();
      }
    } catch (err) {
      console.error("Error adding link:", err);
    }
  };

  const handleUpdateLink = async (e) => {
    e.preventDefault();
    if (!editingLink) return;

    try {
      const res = await fetch(`/api/links/${editingLink.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingLink(null);
        setFormData({ title: "", url: "", icon: "" });
        fetchData();
      }
    } catch (err) {
      console.error("Error updating link:", err);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!confirm("Hapus link ini?")) return;

    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting link:", err);
    }
  };

  const toggleVisibility = async (link) => {
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !link.visible }),
      });
      fetchData();
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div
          className="text-[#FF6B9D] font-['Press_Start_2P']"
          style={{ fontSize: "10px" }}
        >
          LOADING GAME...
        </div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/account/signin";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] font-['Press_Start_2P']">
      <style jsx global>{`
        @keyframes pixelBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pixelShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .pixel-bounce:hover {
          animation: pixelBounce 0.6s ease-in-out;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#16213e] border-b-4 border-[#FF6B9D] p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-[#FF6B9D]" style={{ fontSize: "12px" }}>
            PIXEL DASHBOARD
          </h1>
          <div className="flex gap-4">
            <a
              href={`/${profile?.username}`}
              target="_blank"
              className="text-[#00d4ff] hover:text-[#00b8d4] flex items-center gap-2"
              style={{ fontSize: "8px" }}
            >
              <ExternalLink size={16} />
              VIEW PAGE
            </a>
            <a
              href="/account/logout"
              className="text-[#ff4757] hover:text-[#ff6b81] flex items-center gap-2"
              style={{ fontSize: "8px" }}
            >
              <LogOut size={16} />
              LOGOUT
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Profile Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e] border-4 border-[#FF6B9D] p-6 text-center">
            <div className="text-[#FF6B9D] mb-2" style={{ fontSize: "10px" }}>
              USERNAME
            </div>
            <div className="text-white" style={{ fontSize: "8px" }}>
              @{profile?.username}
            </div>
          </div>
          <div className="bg-[#16213e] border-4 border-[#00d4ff] p-6 text-center">
            <div className="text-[#00d4ff] mb-2" style={{ fontSize: "10px" }}>
              TOTAL LINKS
            </div>
            <div className="text-white" style={{ fontSize: "12px" }}>
              {links.length}
            </div>
          </div>
          <div className="bg-[#16213e] border-4 border-[#06FFA5] p-6 text-center">
            <div className="text-[#06FFA5] mb-2" style={{ fontSize: "10px" }}>
              TOTAL CLICKS
            </div>
            <div className="text-white" style={{ fontSize: "12px" }}>
              {links.reduce((sum, link) => sum + (link.clicks || 0), 0)}
            </div>
          </div>
        </div>

        {/* Add Link Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddModal(true);
              setFormData({ title: "", url: "", icon: "" });
            }}
            className="bg-[#00d4ff] hover:bg-[#00b8d4] text-white px-6 py-3 border-4 border-[#00b8d4] transition-all active:translate-y-1 flex items-center gap-2 pixel-bounce"
            style={{ fontSize: "10px" }}
          >
            <Plus size={16} />
            ADD NEW LINK
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="bg-[#16213e] border-4 border-[#FF6B9D] p-8 text-center">
              <p className="text-[#FF6B9D]" style={{ fontSize: "10px" }}>
                NO LINKS YET. ADD YOUR FIRST LINK!
              </p>
            </div>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                className="bg-[#16213e] border-4 border-[#FF6B9D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="text-white mb-2" style={{ fontSize: "10px" }}>
                    {link.title}
                  </div>
                  <div
                    className="text-[#00d4ff] break-all"
                    style={{ fontSize: "6px" }}
                  >
                    {link.url}
                  </div>
                  <div
                    className="text-[#06FFA5] mt-2 flex items-center gap-2"
                    style={{ fontSize: "6px" }}
                  >
                    <BarChart3 size={12} />
                    {link.clicks || 0} CLICKS
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleVisibility(link)}
                    className={`${
                      link.visible ? "bg-[#06FFA5]" : "bg-[#ff4757]"
                    } text-white p-3 border-2 border-white`}
                    title={link.visible ? "Hide" : "Show"}
                  >
                    {link.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingLink(link);
                      setFormData({
                        title: link.title,
                        url: link.url,
                        icon: link.icon || "",
                      });
                    }}
                    className="bg-[#00d4ff] text-white p-3 border-2 border-white"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="bg-[#ff4757] text-white p-3 border-2 border-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingLink) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#16213e] border-4 border-[#FF6B9D] p-8 w-full max-w-md">
            <h2 className="text-[#FF6B9D] mb-6" style={{ fontSize: "12px" }}>
              {editingLink ? "EDIT LINK" : "ADD NEW LINK"}
            </h2>
            <form onSubmit={editingLink ? handleUpdateLink : handleAddLink}>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-[#00d4ff] mb-2"
                    style={{ fontSize: "8px" }}
                  >
                    TITLE
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-[#0f3460] border-2 border-[#00d4ff] text-white p-2"
                    style={{ fontFamily: "monospace" }}
                    placeholder="Instagram"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-[#00d4ff] mb-2"
                    style={{ fontSize: "8px" }}
                  >
                    URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="w-full bg-[#0f3460] border-2 border-[#00d4ff] text-white p-2"
                    style={{ fontFamily: "monospace" }}
                    placeholder="https://instagram.com/username"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-[#00d4ff] mb-2"
                    style={{ fontSize: "8px" }}
                  >
                    ICON EMOJI (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full bg-[#0f3460] border-2 border-[#00d4ff] text-white p-2"
                    style={{ fontFamily: "monospace" }}
                    placeholder="📸"
                    maxLength={2}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#00d4ff] hover:bg-[#00b8d4] text-white py-3 border-2 border-[#00b8d4]"
                    style={{ fontSize: "10px" }}
                  >
                    {editingLink ? "UPDATE" : "ADD"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingLink(null);
                      setFormData({ title: "", url: "", icon: "" });
                    }}
                    className="flex-1 bg-[#ff4757] hover:bg-[#ff6b81] text-white py-3 border-2 border-[#ff6b81]"
                    style={{ fontSize: "10px" }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
