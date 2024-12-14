import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SlideType from "./enums/SlideType.enum";
import useSlidesPage from "./page";
import { default as Page } from "./route";

// Mocking components and hooks
vi.mock("./page", () => ({
  __esModule: true,
  default: vi.fn(),
  SlidesProvider: vi.fn(({ children }) => <div>{children}</div>),
}));

vi.mock("./components/split", () => ({
  __esModule: true, // Ensures the mock is treated as an ES module
  default: vi.fn(() => <div>Split Component</div>),
}));
vi.mock("./components/solo", () => ({
  __esModule: true, // Ensures the mock is treated as an ES module
  default: vi.fn(() => <div>Solo Component</div>),
}));

describe("Page Component", () => {
  type MockViewModel = {
    shouldShowLoader: ReturnType<typeof vi.fn>;
    getCurrentSlideType: ReturnType<typeof vi.fn>;
    shouldRenderPrevBtn: ReturnType<typeof vi.fn>;
    shouldRenderNextBtn: ReturnType<typeof vi.fn>;
    goPrevSlide: ReturnType<typeof vi.fn>;
    goNextSlide: ReturnType<typeof vi.fn>;
  };

  let mockViewModel: MockViewModel;

  beforeEach(() => {
    mockViewModel = {
      shouldShowLoader: vi.fn(),
      getCurrentSlideType: vi.fn(),
      shouldRenderPrevBtn: vi.fn(),
      shouldRenderNextBtn: vi.fn(),
      goPrevSlide: vi.fn(),
      goNextSlide: vi.fn(),
    };

    (useSlidesPage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockViewModel
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show loader when `shouldShowLoader` returns true", () => {
    mockViewModel.shouldShowLoader.mockReturnValue(true);

    render(<Page />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render `Split` component when slide type is SPLIT", () => {
    mockViewModel.shouldShowLoader.mockReturnValue(false);
    mockViewModel.getCurrentSlideType.mockReturnValue(SlideType.SPLIT);

    render(<Page />);

    expect(screen.getByText("Split Component")).toBeInTheDocument();
  });

  it("should render `Solo` component when slide type is not SPLIT", () => {
    mockViewModel.shouldShowLoader.mockReturnValue(false);
    mockViewModel.getCurrentSlideType.mockReturnValue(SlideType.SOLO);

    render(<Page />);

    expect(screen.getByText("Solo Component")).toBeInTheDocument();
  });

  it("should render and trigger the Prev button correctly", () => {
    mockViewModel.shouldShowLoader.mockReturnValue(false);
    mockViewModel.shouldRenderPrevBtn.mockReturnValue(true);

    render(<Page />);

    const prevButton = screen.getByLabelText("prevbtn");
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(mockViewModel.goPrevSlide).toHaveBeenCalledTimes(1);
  });

  it("should render and trigger the Next button correctly", () => {
    mockViewModel.shouldShowLoader.mockReturnValue(false);
    mockViewModel.shouldRenderNextBtn.mockReturnValue(true);

    render(<Page />);

    const nextButton = screen.getByTestId("nextbtn");
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(mockViewModel.goNextSlide).toHaveBeenCalledTimes(1);
  });

  it("should not render Prev button when `shouldRenderPrevBtn` returns false", () => {
    mockViewModel.shouldRenderPrevBtn.mockReturnValue(false);

    render(<Page />);

    expect(screen.queryAllByLabelText("prevbtn").length).toBe(0);
  });

  it("should not render Next button when `shouldRenderNextBtn` returns false", () => {
    mockViewModel.shouldRenderNextBtn.mockReturnValue(false);

    render(<Page />);

    expect(screen.queryAllByLabelText("nextbtn").length).toBe(0);
  });
});
