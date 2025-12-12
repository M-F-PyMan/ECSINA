"use client";
import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="flex items-center gap-2 text-sm md:text-base text-gray-600 my-4">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          {item.url ? (
            <Link href={item.url} className="hover:text-primary-7">
              {item.label}
            </Link>
          ) : (
            <span className="text-black font-semibold">{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
