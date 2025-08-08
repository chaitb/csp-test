"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [cspHeader, setCSPHeader] = useState<string>("");

  useEffect(() => {
    fetch(window.location.href, { method: "HEAD" })
      .then((response) => {
        const csp = response.headers.get("Content-Security-Policy");
        setCSPHeader(csp || "No CSP header found");
      })
      .catch((error) => {
        setCSPHeader("Error fetching CSP header");
      });
  }, []);

  return (
    <div className="font-sans h-screen p-8 flex flex-col">
      <main className="max-w-4xl mx-auto my-auto">
        <div className="bg-yellow-200 dark:bg-yellow-800 rounded-lg p-6 mb-6">
          <h1 className="text-xl font-semibold flex gap-2 mb-3 text-center items-center align-middle"><WarnIcon/>This is a Test for Notion CSP</h1>
          Source: <Link className="underline" href="https://github.com/chaitb/csp-test">https://github.com/chaitb/csp-test</Link>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Currently enabled CSP Headers:</h2>
          <code className="block bg-black/10 dark:bg-white/10 p-4 rounded text-sm break-all">
            {cspHeader || "Loading..."}
          </code>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold">Allowlist the following frame-ancestors for Notion</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Only these domains are allowed to embed this website in an iframe using the frame-ancestors directive.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="font-mono">https://*.notion.so</li>
            <li className="font-mono">notion://notion.so</li>
            <li className="font-mono">notion://www.notion.so</li>
            <li className="font-mono">https://*.notion.site (for all public sites)</li>
					  <li className="font-mono">https://&lt;your-published-domain&gt;.notion.site (for only your public sites)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function WarnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
