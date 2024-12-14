import { create } from "zustand";
import Slide from "./models/slide";

export interface SlidesPage {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;

  currSlide: number;
  setCurrSlide: (slide: number) => void;
}

const useSlideStore = create<SlidesPage>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),

  currSlide: 0,
  setCurrSlide: (currSlide) => set({ currSlide }),
}));

export default useSlideStore;
