import { Component, MouseEvent } from "react";

interface CarouselProps {
    images: string[];
    activeImage: number;
    setActiveImage: (index: number) => void;
}

class Carousel extends Component<CarouselProps> {
    static defaultProps = {
        images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
    };

    handleIndexClick = (event: MouseEvent<HTMLImageElement>) => {
        if(!(event.target instanceof HTMLImageElement)) {
            return;
        }

        if(event.target.dataset.index) {
        this.props.setActiveImage(+event.target.dataset.index);
        }

    };

    render() {
        const { images, activeImage: active } = this.props;

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal" />
                <div className="carousel-smaller">
                    {images.map((image, idx) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                        <img
                            src={image}
                            alt="animal thumbnail"
                            className={idx === active ? "active" : ""}
                            key={image}
                            data-index={idx}
                            onClick={this.handleIndexClick}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;
