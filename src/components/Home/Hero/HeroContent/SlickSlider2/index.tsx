import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './style.css?inline'

interface Slide {
    imageUrl: string;
    title: string;
    description: string

}

interface Props {
    slides: Slide[]
}

const SlickSlider = component$<Props>(({ slides }) => {
    useStyles$(styles)
  const currentSlide = useSignal<number>(0)

  const handlePrevSlide = $(() => {
    currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1;
  });

  const handleNextSlide = $(() => {
    currentSlide.value = currentSlide.value === slides.length + 1 ? 0 : currentSlide.value + 1;
  });

  const slideWidth = 100 / (slides.length + 2);

  const slideStyle = {
    width: `${slideWidth}%`,
    transform: `translateX(-${(currentSlide.value + 1) * slideWidth}%)`,
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div class="slider-container">
      <div
        class="slide"
        style={{
          ...slideStyle,
          backgroundImage: `url(${slides[slides.length - 1].imageUrl})`,
          opacity: currentSlide.value === -1 ? 1 : 0,
        }}
      ></div>
      {slides.map((slide, index) => (
        <div
          key={index}
          class={`slide ${index === currentSlide.value ? 'active' : ''}`}
          style={{ ...slideStyle, backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div class="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
      <div
        class="slide"
        style={{
          ...slideStyle,
          backgroundImage: `url(${slides[0].imageUrl})`,
          opacity: currentSlide.value === slides.length ? 1 : 0,
        }}
      ></div>
      <button class="prev" onClick$={handlePrevSlide}>
        &#10094;
      </button>
      <button class="next" onClick$={handleNextSlide}>
        &#10095;
      </button>
    </div>
  );
});

export default SlickSlider;