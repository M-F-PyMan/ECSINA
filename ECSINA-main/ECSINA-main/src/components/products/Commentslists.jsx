// components/products/CommentsList.jsx
"use client";
import React from "react";

export default function CommentsList({ comments = [] }) {
  if (!comments.length) {
    return (
      <p className="text-gray-500 text-sm mt-3">
        هنوز نظری ثبت نشده است.
      </p>
    );
  }

  return (
    <ul className="space-y-4 mt-4">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border border-gray-200 rounded-lg p-3 bg-gray-50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm text-gray-800">
              {comment.user?.name || "کاربر"}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {comment.content}
          </p>

          {/* نمایش پاسخ‌ها اگر وجود داشته باشه */}
          {comment.replies?.length > 0 && (
            <ul className="mt-2 space-y-2 pl-4 border-l border-gray-200">
              {comment.replies.map((reply) => (
                <li key={reply.id} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">
                    {reply.display_name}:
                  </span>{" "}
                  {reply.content}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
