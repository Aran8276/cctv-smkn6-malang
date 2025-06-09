import React, { FC, useState } from "react";
import { SettingsViewProps } from "./Settings.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";

const SettingsView: FC<SettingsViewProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <Header heading="Setelan" />
      <BreadcrumbString value="Beranda/Setelan" />
      <section className="min-h-screen flex items-start justify-center">
        <div className="w-full bg-white rounded-2xl p-8">
          <h3 className="text-base font-medium text-slate-500 mb-6">
            Peraturan Akun
          </h3>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-[60px] h-[60px] rounded-full bg-gray-200"></div>
              <span className="text-xl font-bold text-gray-900">
                Supriadi S.pd
              </span>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Edit Profile
            </a>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-900">Ganti Password</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2" // Slightly thicker arrow
                stroke="currentColor"
                className="w-5 h-5 text-gray-700" // Darker arrow
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            {/* Bisukan Notifikasi */}
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-900">
                Bisukan Notifikasi
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            {/* Mode Gelap */}
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-900">Mode Gelap</span>
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${
                  isDarkMode ? "bg-indigo-500" : "bg-gray-300" // bg-gray-200 in image is lighter, gray-300 better for off state contrast
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                role="switch"
                aria-checked={isDarkMode}
              >
                <span className="sr-only">Mode Gelap</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isDarkMode ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white transform ring-0 transition ease-in-out duration-200`} // Removed shadow-lg to match image
                ></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingsView;
