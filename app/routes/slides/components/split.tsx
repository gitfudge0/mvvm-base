import useSlidesPage from "../page";

export default function Split() {
  const viewModel = useSlidesPage();
  const slide = viewModel.getCurrentSlide();

  return (
    <main className="w-full h-full flex">
      <section className="h-full flex-1 py-20 flex flex-col">
        <div id="title" className="px-20 py-4">
          <p className="text-6xl lato-light">{slide.title}</p>
        </div>
        <div id="description" className="flex-grow py-10 px-20">
          <ul>
            {slide.description.map((x, i) => (
              <li
                key={`slide-${slide.id}${i + 1}]`}
                className="text-4xl lato-regular list-disc ml-4 mb-4"
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {viewModel.shouldRenderImageForCurrentSlide() && (
        <section className="flex-1 flex items-center justify-center px-20">
          <img src={slide.img} alt="img" />
        </section>
      )}
    </main>
  );
}
