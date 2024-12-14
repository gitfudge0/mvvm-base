import type { MetaFunction } from "@remix-run/node";
import { Icon } from "@iconify/react";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "MVVM in React" },
    { name: "description", content: "Welcome to the presentation!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center justify-center h-5/6 gap-2">
        <p className="text-7xl lato-light">MVVM in React</p>
        <p className="text-xl lato-regular">
          A clean way to build your applications
        </p>
      </main>
      <footer className="h-1/6">
        <NavLink to="/slides">
          <button
            type="button"
            onClick={() => console.log("oaisndi")}
            className="border border-white rounded-full p-3"
          >
            <Icon icon="line-md:arrow-right" />
          </button>
        </NavLink>
      </footer>
    </div>
  );
}
