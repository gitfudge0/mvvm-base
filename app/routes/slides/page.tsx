import { createContext, FC, useContext, useEffect } from "react";
import Content from "./content";
import useSlideStore from "./store";
import SlidesViewModel from "./viewmodel";

const PageContext = createContext<SlidesViewModel | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const SlidesProvider: FC<ProviderProps> = ({ children }) => {
  const store = useSlideStore();
  const viewModel = new SlidesViewModel(store);

  useEffect(() => {
    viewModel.updateSlides(Content);
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        viewModel.goPrevSlide();
        return;
      }

      if (e.key === "ArrowRight") {
        viewModel.goNextSlide();
        return;
      }

      return;
    };
    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [store]);

  return (
    <PageContext.Provider value={viewModel}>{children}</PageContext.Provider>
  );
};

const useSlidesPage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("Slides context must be used inside SlidesProvider");
  }

  return context;
};

export default useSlidesPage;
