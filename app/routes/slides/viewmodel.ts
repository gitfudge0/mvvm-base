import SlideType from "./enums/SlideType.enum";
import Slide from "./models/slide";
import { SlidesPage } from "./store";

export default class SlidesViewModel {
  private store: SlidesPage;

  constructor(store: SlidesPage) {
    this.store = store;
  }

  public shouldShowLoader(): boolean {
    return this.store.slides.length === 0;
  }

  public updateSlides(slides: Slide[]) {
    this.store.setSlides(slides);
  }

  public getCurrentSlide(): Slide {
    const { slides, currSlide } = this.store;
    return slides[currSlide];
  }

  public getCurrentSlideType(): SlideType {
    const { slides, currSlide } = this.store;
    return slides[currSlide].type;
  }

  public shouldRenderImageForCurrentSlide(): boolean {
    const { slides, currSlide } = this.store;
    return !!slides[currSlide].img;
  }

  public shouldRenderNextBtn(): boolean {
    const { slides, currSlide } = this.store;
    return currSlide + 1 < slides.length;
  }

  public goNextSlide() {
    const { slides, currSlide } = this.store;
    if (currSlide + 1 === slides.length) return;

    let nextSlide = currSlide + 1;
    if (nextSlide > slides.length) nextSlide = slides.length;
    this.store.setCurrSlide(nextSlide);
  }

  public shouldRenderPrevBtn(): boolean {
    const { currSlide } = this.store;
    return currSlide !== 0;
  }

  public goPrevSlide() {
    const { currSlide } = this.store;
    if (currSlide === 0) return;

    let prevSlide = currSlide - 1;
    if (prevSlide < 0) prevSlide = 0;
    this.store.setCurrSlide(prevSlide);
  }
}
