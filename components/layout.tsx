import React from 'react';
import Link from 'next/link';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pages = ['tailwind', 'next', ''];
  return (
    <>
      <div className="flex w-screen h-screen bg-blue-400">
        <div className="w-max p-4 h-screen justify-between items-center flex flex-col bg-white">
          <div>logo here</div>

          <div className="w-full h-max py-4 rounded-lg items-center bg-blue-400 flex flex-col space-y-8">
            {pages.map((page) => (
              <Link href={`/page/${page}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" cursor-pointer h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </Link>
            ))}
          </div>

          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
        <div className="w-full h-full">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
