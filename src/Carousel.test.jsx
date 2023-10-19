import {test, expect} from "vitest"
import CarouselComponent from "./CarouselComponent";
import {fireEvent, render} from "@testing-library/react";

test("sets the hero to the clicked thumbnail", async () => {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];
    let activeImage = 0;
    const setActiveImage = (newActiveImage) => {
        activeImage = newActiveImage;
        carousel.rerender(
            <Carousel
                images={images}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
            />
        );
    };

    const carousel = render(
        <Carousel
            images={images}
            activeImage={0}
            setActiveImage={setActiveImage}
        />
    )
    const hero = await carousel.findByTestId("animal-hero")
    expect(hero.src).toContain("image1.jpg")

    for(let i = 0; i < images.length; i++) {
        const image = images[i]
        const thumbnail = await carousel.findByTestId(`animal-thumbnail-${i}`)

        fireEvent.click(thumbnail)
        expect(hero.src).toContain(image)
        expect(Array.from(thumbnail.classList)).toContain('active')
    }
    // const thumbnails = carousel.queryAllByTestId("animal-thumbnail")
});