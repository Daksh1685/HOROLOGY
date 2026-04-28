"use client";
import { useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

export default function BackendWakeup() {
  useEffect(() => {
    // Silently ping the backend to wake it up from Render's free-tier sleep
    fetch(`${API_BASE_URL}/`).catch(() => {});
  }, []);
  return null;
}
