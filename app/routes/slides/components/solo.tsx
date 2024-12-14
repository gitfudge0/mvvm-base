import useSlidesPage from "../page";

export default function Solo() {
  const viewModel = useSlidesPage();
  const slide = viewModel.getCurrentSlide();

  return (
    <main className="w-full h-full flex">
      <section className="h-full flex-1 py-20 flex flex-col">
        <div id="title" className="px-20 py-4">
          <p className="text-6xl lato-light">{slide.title}</p>
        </div>
        {viewModel.shouldRenderImageForCurrentSlide() && (
          <div
            id="description"
            className="flex-grow flex items-center justify-center py-10 px-20"
          >
            <img className="max-w-3/5" src={slide.img} alt="img" />
          </div>
        )}
      </section>
    </main>
  );
}
