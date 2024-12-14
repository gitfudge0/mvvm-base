import { renderHook, act } from "@testing-library/react";
import useSlideStore from "./store";
import Slide from "./models/slide";

// Use the provided SlideType enum
enum SlideType {
  SOLO = "solo",
  SPLIT = "split",
}

// Mock Slide data for testing
const mockSlides: Slide[] = [
  {
    id: 1,
    type: SlideType.SOLO,
    title: "Welcome Slide",
    description: ["First slide of the presentation"],
    img: "welcome.jpg",
  },
  {
    id: 2,
    type: SlideType.SPLIT,
    title: "Main Content",
    description: ["Key points", "Important information"],
    img: undefined,
  },
  {
    id: 3,
    type: SlideType.SOLO,
    title: "Conclusion Slide",
    description: ["Final thoughts"],
    img: "conclusion.png",
  },
];

describe("useSlideStore", () => {
  test("initial state is correct", () => {
    const { result } = renderHook(() => useSlideStore());
    expect(result.current.slides).toEqual([]);
    expect(result.current.currSlide).toBe(0);
  });

  test("setSlides updates slides correctly", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
    });

    expect(result.current.slides).toEqual(mockSlides);
  });

  test("setCurrSlide updates current slide index", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setCurrSlide(1);
    });

    expect(result.current.currSlide).toBe(1);
  });

  test("can set slides and update current slide", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
      result.current.setCurrSlide(2);
    });

    expect(result.current.slides).toEqual(mockSlides);
    expect(result.current.currSlide).toBe(2);
  });

  test("can reset slides to empty array", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
      result.current.setSlides([]);
    });

    expect(result.current.slides).toEqual([]);
  });

  test("setCurrSlide handles out of bounds index", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
      result.current.setCurrSlide(10); // Beyond array length
    });

    expect(result.current.currSlide).toBe(10);
  });

  test("multiple state updates work correctly", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
      result.current.setCurrSlide(1);
      result.current.setSlides([
        ...mockSlides,
        {
          id: 4,
          type: SlideType.SPLIT,
          title: "Additional Slide",
          description: ["New slide content"],
          img: undefined,
        },
      ]);
    });

    expect(result.current.slides.length).toBe(4);
    expect(result.current.currSlide).toBe(1);
  });

  test("slides can have different types", () => {
    const { result } = renderHook(() => useSlideStore());
    act(() => {
      result.current.setSlides(mockSlides);
    });

    expect(result.current.slides[0].type).toBe(SlideType.SOLO);
    expect(result.current.slides[1].type).toBe(SlideType.SPLIT);
  });
});
