"use client";

import { usePathname } from "next/navigation";

export default function ActiveLinkWrapper({
  children,
  url,
  className,
  activeClass,
}: {
  children: React.ReactNode;
  url: string;
  className: string;
  activeClass: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <div className={`${className} ${isActive ? activeClass : ""}`}>
      {children}
    </div>
  );
}