"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/* تنظیم پایهٔ API از env */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* هدر احراز هویت (JWT در localStorage) */
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* فرمت تاریخ ساده برای نمایش پیام‌ها */
function formatDateShort(date) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return new Date(date).toLocaleString();
  }
}

function Page() {
  const router = useRouter();

  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("عنوان پیشنهادی");
  const [isClient, setIsClient] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const editorRef = useRef(null);
  const debounceRef = useRef(null);
  const autosaveRef = useRef(null);
  const docIdRef = useRef(null); // اگر سندی برای ویرایش باشد اینجا نگهداری می‌شود

  /* بارگذاری client-only resources */
  useEffect(() => {
    setIsClient(true);
  }, []);

  /* افزودن استایل Jodit به head در client */
  useEffect(() => {
    if (isClient) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/jodit/3.24.7/jodit.min.css";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isClient]);

  /* آپلود تصویر به بک‌اند (multipart/form-data) */
  const uploadImage = useCallback(async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_BASE}/api/uploads/images/`, {
        method: "POST",
        headers: { ...getAuthHeaders() }, // Content-Type نباید دستی تنظیم شود
        body: form,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }
      const data = await res.json();
      // انتظار داریم پاسخ شامل url باشد
      return data.url || data.fileUrl || data.data?.url || null;
    } catch (e) {
      console.error("uploadImage error:", e);
      return null;
    }
  }, []);

  /* ذخیره (create یا update) */
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const payload = {
        title,
        content: editorContent,
      };
      const headers = { "Content-Type": "application/json", ...getAuthHeaders() };
      let res;
      if (docIdRef.current) {
        res = await fetch(`${API_BASE}/api/user-documents/${docIdRef.current}/`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/api/user-documents/`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Save failed");
      }
      const data = await res.json();
      docIdRef.current = data.id || docIdRef.current;
      setSaveMessage("ذخیره با موفقیت انجام شد.");
      setLastSavedAt(new Date());
    } catch (e) {
      console.error("handleSave error:", e);
      setSaveMessage("خطا در ذخیره‌سازی. دوباره تلاش کنید.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  }, [title, editorContent]);

  /* پیش‌نمایش: باز کردن محتوا در تب جدید */
  const handlePreview = useCallback(() => {
    const html = `
      <!doctype html>
      <html lang="fa">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>پیش‌نمایش - ${title}</title>
          <style>
            body { font-family: Vazir, IranSans, Arial, sans-serif; padding: 20px; direction: rtl; background: #fff; color: #111; }
            .preview-container { max-width: 900px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="preview-container">
            <h1>${title}</h1>
            ${editorContent}
          </div>
        </body>
      </html>
    `;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }, [title, editorContent]);

  /* autosave با debounce (5s) */
  useEffect(() => {
    if (!isClient || !autosaveEnabled) return;
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    autosaveRef.current = setTimeout(() => {
      // فقط اگر محتوا غیرخالی باشد ذخیره کن
      if (editorContent && editorContent.trim().length > 20) {
        handleSave();
      }
    }, 5000);
    return () => clearTimeout(autosaveRef.current);
  }, [editorContent, autosaveEnabled, handleSave, isClient]);

  /* handler تغییر محتوا (debounced local update) */
  const handleEditorChange = useCallback((newContent) => {
    setEditorContent(newContent);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // می‌توان اینجا کارهای سبک انجام داد (مثلاً local preview)
    }, 200);
  }, []);

  /* پیکربندی Jodit (uploader به API متصل شده) */
  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: "متن خود را اینجا بنویسید...",
      direction: "rtl",
      language: "fa",
      height: 400,
      theme: "default",
      toolbarButtonSize: "medium",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "image",
        "table",
        "link",
        "hr",
        "|",
        "fullscreen",
        "preview",
        "print",
      ],
      /* uploader: از ارسال base64 جلوگیری و از endpoint استفاده می‌کنیم */
      uploader: {
        insertImageAsBase64URI: false,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg"],
        url: `${API_BASE}/api/uploads/images/`,
        format: "json",
        headers: getAuthHeaders(),
      },
      style: {
        font: '16px "Vazir", "IranSans", Arial, Tahoma, sans-serif !important',
      },
      defaultStyle: `
        font-family: "Vazir",  "IranSans", Arial, Tahoma, sans-serif !important;
        font-size: 16px !important;
        line-height: 1.8 !important;
        color: #333 !important;
      `,
      editorClassName: "vazir-font-editor",
      controls: {
        font: {
          list: {
            "": "پیش‌فرض",
            'Vazir, Arial, sans-serif': "وزیر",
            "IranSans, Arial, sans-serif": "ایران سنس",
            "Arial, Helvetica, sans-serif": "آریال",
            "Tahoma, Geneva, sans-serif": "تهوما",
          },
        },
        fontsize: {
          list: ["8", "10", "12", "14", "16", "18", "20", "24", "28", "32"],
        },
      },
    };
  }, []);

  /* اگر بخواهی uploader سفارشی‌تر باشه (مثلاً قبل از آپلود پردازش کنیم)، می‌توانیم event listener اضافه کنیم */
  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    // نمونه: اگر Jodit از uploader.url استفاده نکند، می‌توانیم فایل‌ها را intercept کنیم
    const onBeforeInsertImage = async (files) => {
      // files ممکن است FileList یا آرایه باشد
      try {
        const file = files && files[0];
        if (!file) return;
        const uploadedUrl = await uploadImage(file);
        if (uploadedUrl) {
          // درج تصویر در ادیتور
          editor.selection.insertHTML(`<img src="${uploadedUrl}" alt="" />`);
        } else {
          console.warn("Upload failed, image not inserted");
        }
      } catch (e) {
        console.error("onBeforeInsertImage error:", e);
      }
    };

    // برخی نسخه‌های Jodit event names متفاوت است؛ این یک guard است
    if (editor.events && typeof editor.events.on === "function") {
      editor.events.on("beforeInsertImage", onBeforeInsertImage);
    }

    return () => {
      if (editor.events && typeof editor.events.off === "function") {
        editor.events.off("beforeInsertImage", onBeforeInsertImage);
      }
    };
  }, [uploadImage, editorRef]);

  /* نمونهٔ تغییر عنوان از دکمه‌های پیشنهادی */
  const changeTitle = useCallback(() => {
    // اینجا می‌توانی عنوان را از یک API بگیری یا الگوریتمی اجرا کنی
    const newTitle = "عنوان پیشنهادی";
    setTitle(newTitle);
    alert("عنوان تغییر کرد.");
  }, []);

  /* اگر نیاز به بارگذاری سند برای ویرایش باشه، می‌توانی docId را از route یا query بگیری و اینجا load کنی.
     نمونهٔ ساده (غیرفعال): */
  useEffect(() => {
    const loadIfEditing = async () => {
      // مثال: اگر route param یا query شامل docId باشد آن را بارگذاری کن
      // const docId = null;
      // if (!docId) return;
      // try {
      //   const res = await fetch(`${API_BASE}/api/user-documents/${docId}/`, { headers: { ...getAuthHeaders() } });
      //   if (!res.ok) return;
      //   const data = await res.json();
      //   setTitle(data.title || title);
      //   setEditorContent(data.content || "");
      //   docIdRef.current = data.id;
      // } catch (e) {
      //   console.error("load doc error", e);
      // }
    };
    loadIfEditing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  /* اگر هنوز client آماده نیست، لودینگ نشان بده */
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری ویرایشگر...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container h-full mx-auto pb-[40px] font-iransans">
      <h3 className="mt-[10px] font-iransans font-bold md:font-semibold text-[16px] md:text-[30px] text-center">عنوان</h3>

      <div className="bg-white md:border md:rounded-[30px] overflow-hidden">
        <div className="p-2 md:p-6 flex flex-col gap-[20px]">
          {/* پیشنهاد عناوین */}
          <div className="h-[230px] flex flex-col rounded-[8px] overflow-hidden text-[16px] md:text-[24px] font-semibold ">
            <div className="bg-main-1 text-white basis-[25%] flex justify-center items-center">
              <p>عنوان‌های پیشنهادی اکسینا</p>
            </div>
            <div className="basis-[75%] bg-[#0029BC42] py-[15px] px-[25px] grid grid-cols-12 gap-[10px]">
              {[1, 2, 3, 4].map((t) => (
                <button
                  onClick={changeTitle}
                  key={t}
                  className="bg-main-1/25 hover:bg-main-1/35 transition-all col-span-12 md:col-span-6 text-[#240579] rounded-[8px] "
                  type="button"
                >
                  عنوان پیشنهادی
                </button>
              ))}
            </div>
          </div>

          {/* کنترل‌های ذخیره و پیش‌نمایش */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
              >
                پیش‌نمایش
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                type="button"
                className="px-4 py-2 rounded-lg bg-main-1 text-white text-sm disabled:opacity-60"
              >
                {saving ? "در حال ذخیره..." : "ذخیره"}
              </button>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autosaveEnabled}
                  onChange={(e) => setAutosaveEnabled(e.target.checked)}
                />
                ذخیره خودکار
              </label>
            </div>

            <div className="text-right text-sm text-gray-600">
              {saveMessage && <div>{saveMessage}</div>}
              {lastSavedAt && <div>آخرین ذخیره: {formatDateShort(lastSavedAt)}</div>}
            </div>
          </div>

          {/* ادیتور */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
            <JoditEditor
              ref={editorRef}
              value={editorContent || undefined}
              config={config}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
              className="font-iransans"
            />
          </div>

          <div className="self-end">
            <Image src={"/assets/icons/Logo.svg"} alt="logo" width={120} height={120} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
