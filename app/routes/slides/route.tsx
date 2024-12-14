import { Icon } from "@iconify/react/dist/iconify.js";
import type { MetaFunction } from "@remix-run/react";
import Split from "./components/split";
import useSlidesPage, { SlidesProvider } from "./page";
import SlideType from "./enums/SlideType.enum";
import Solo from "./components/solo";

export const meta: MetaFunction = () => [
  { title: "Slides" },
  { name: "description", content: "Slides" },
];

function Slides() {
  const viewModel = useSlidesPage();

  if (viewModel.shouldShowLoader()) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <main className="flex-grow">
        {viewModel.getCurrentSlideType() === SlideType.SPLIT ? (
          <Split />
        ) : (
          <Solo />
        )}
      </main>
      <footer className="fixed bottom-5 w-full h-20 px-10 grid grid-cols-3 items-center justify-between">
        <span className="flex justify-start">
          {viewModel.shouldRenderPrevBtn() && (
            <button
              type="button"
              aria-label="prevbtn"
              data-testid="prevbtn"
              onClick={() => viewModel.goPrevSlide()}
              className="border border-white rounded-full p-3"
            >
              <Icon icon="line-md:arrow-left" />
            </button>
          )}
        </span>
        <span />
        <span className="flex justify-end">
          {viewModel.shouldRenderNextBtn() && (
            <button
              type="button"
              aria-label="nextbtn"
              data-testid="nextbtn"
              onClick={() => viewModel.goNextSlide()}
              className="border border-white rounded-full p-3"
            >
              <Icon icon="line-md:arrow-right" />
            </button>
          )}
        </span>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <SlidesProvider>
      <Slides />
    </SlidesProvider>
  );
}
