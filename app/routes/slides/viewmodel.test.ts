import { describe, it, expect, vi, beforeEach } from "vitest";
import SlideType from "./enums/SlideType.enum";
import Slide from "./models/slide";
import SlidesViewModel from "./viewmodel";
import { SlidesPage } from "./store";

describe("SlidesViewModel", () => {
  let mockStore: SlidesPage;
  let viewModel: SlidesViewModel;

  const mockSlides: Slide[] = [
    {
      id: 1,
      type: SlideType.SOLO,
      title: "First Slide",
      description: ["Description 1"],
      img: "image1.jpg",
    },
    {
      id: 2,
      type: SlideType.SPLIT,
      title: "Second Slide",
      description: ["Description 2"],
    },
  ];

  beforeEach(() => {
    // Create a mock store with vi.fn() for methods
    mockStore = {
      slides: mockSlides,
      currSlide: 0,
      setSlides: vi.fn(),
      setCurrSlide: vi.fn(),
    };

    // Initialize ViewModel with mock store
    viewModel = new SlidesViewModel(mockStore);
  });

  describe("shouldShowLoader", () => {
    it("returns true when no slides", () => {
      mockStore.slides = [];
      expect(viewModel.shouldShowLoader()).toBe(true);
    });

    it("returns false when slides exist", () => {
      expect(viewModel.shouldShowLoader()).toBe(false);
    });
  });

  describe("updateSlides", () => {
    it("calls store.setSlides with provided slides", () => {
      const newSlides: Slide[] = [
        {
          id: 3,
          type: SlideType.SOLO,
          title: "New Slide",
          description: ["New Description"],
        },
      ];

      viewModel.updateSlides(newSlides);

      expect(mockStore.setSlides).toHaveBeenCalledWith(newSlides);
    });
  });

  describe("getCurrentSlide", () => {
    it("returns the current slide", () => {
      const currentSlide = viewModel.getCurrentSlide();
      expect(currentSlide).toEqual(mockSlides[0]);
    });
  });

  describe("getCurrentSlideType", () => {
    it("returns the type of current slide", () => {
      const currentSlideType = viewModel.getCurrentSlideType();
      expect(currentSlideType).toBe(SlideType.SOLO);
    });
  });

  describe("shouldRenderImageForCurrentSlide", () => {
    it("returns true when slide has image", () => {
      expect(viewModel.shouldRenderImageForCurrentSlide()).toBe(true);
    });

    it("returns false when slide has no image", () => {
      mockStore.currSlide = 1;
      expect(viewModel.shouldRenderImageForCurrentSlide()).toBe(false);
    });
  });

  describe("shouldRenderNextBtn", () => {
    it("returns true when not on last slide", () => {
      expect(viewModel.shouldRenderNextBtn()).toBe(true);
    });

    it("returns false when on last slide", () => {
      mockStore.currSlide = 1;
      expect(viewModel.shouldRenderNextBtn()).toBe(false);
    });
  });

  describe("goNextSlide", () => {
    it("moves to next slide when not on last slide", () => {
      viewModel.goNextSlide();
      expect(mockStore.setCurrSlide).toHaveBeenCalledWith(2);
    });

    it("does not move beyond last slide", () => {
      mockStore.currSlide = 1;
      viewModel.goNextSlide();
      expect(mockStore.setCurrSlide).not.toHaveBeenCalled();
    });
  });

  describe("shouldRenderPrevBtn", () => {
    it("returns false when on first slide", () => {
      expect(viewModel.shouldRenderPrevBtn()).toBe(false);
    });

    it("returns true when not on first slide", () => {
      mockStore.currSlide = 1;
      expect(viewModel.shouldRenderPrevBtn()).toBe(true);
    });
  });

  describe("goPrevSlide", () => {
    it("moves to previous slide when not on first slide", () => {
      mockStore.currSlide = 1;
      viewModel.goPrevSlide();
      expect(mockStore.setCurrSlide).toHaveBeenCalledWith(0);
    });

    it("does not move before first slide", () => {
      viewModel.goPrevSlide();
      expect(mockStore.setCurrSlide).not.toHaveBeenCalled();
    });
  });
});
