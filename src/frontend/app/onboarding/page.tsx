"use client";
import { useEffect } from "react";
import { getToken } from "../../lib/api.client";

export default function OnboardingPage() {
  useEffect(() => {
    if (!getToken()) window.location.href = "/login?next=/eligibility";
    else window.location.href = "/eligibility";
  }, []);

  return (
    <section className="section">
      <div className="container">
        <p>Setting up your account…</p>
      </div>
    </section>
  );
}
