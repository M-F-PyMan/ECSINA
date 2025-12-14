"use client";

import React, { useCallback, useEffect, useState } from "react";
import Title from "@/components/user/Title";
import ProgressTimeline from "@/components/user/ProgressTimeline";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* helper برای هدر احراز هویت (در صورت استفاده از JWT) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function Page() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/user-activity-log/?ordering=-timestamp&limit=20`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `خطا در دریافت فعالیت‌ها (${res.status})`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.results || [];
      const mapped = items.map((it) => ({
        id: it.id,
        type: it.action_type || it.type || "event",
        text:
          it.action_type === "download"
            ? `دانلود ${it.file?.title || it.file_title || ""}`
            : it.action_type === "review"
            ? `بازبینی ${it.file?.title || it.file_title || ""}`
            : it.message || it.description || it.action || "",
        time: it.timestamp || it.created_at || it.date || null,
        raw: it,
      }));
      setActivities(mapped);
    } catch (e) {
      console.error("fetchActivities error:", e);
      setError("خطا در بارگذاری فعالیت‌ها. دوباره تلاش کنید.");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <div className="container mx-auto h-full font-iransans">
      <Title title={"فعالیت های اخیر"} />

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-1" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-6">{error}</div>
        ) : activities.length === 0 ? (
          <div className="text-center text-gray-600 py-6">هیچ فعالیتی یافت نشد.</div>
        ) : (
          <ProgressTimeline activities={activities} />
        )}
      </div>
    </div>
  );
}

export default Page;
