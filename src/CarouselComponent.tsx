import {Component} from "react";
import Carousel from 'react-material-ui-carousel'
import {Box} from "@mui/material";

interface CarouselProps {
    images: string[];
    activeImage: string;
    setActiveImage: (src: string) => void;
}

class CarouselComponent extends Component<CarouselProps> {
    static defaultProps = {
        images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
    };

    render() {
        const {images, activeImage: active} = this.props;

        let groupedImages: string[][] = [];
        if (images.length <= 3) {
            groupedImages = [images];
        } else {
            for (let i = 0; i < images.length; i++) {
                groupedImages.push([
                    images[(i - 1 + images.length) % images.length],
                    images[i],
                    images[(i + 1) % images.length]
                ]);
            }
        }

        return (
            <Box sx={{
                flexGrow: 1,
                maxWidth: "750px"
            }}>
                <Box sx={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    borderRadius: "20px",
                }}>
                    <img src={active} alt="animal" data-testid="animal-hero"
                         style={{borderRadius: "30px", maxWidth: "600px", width: "100%", aspectRatio: "1"}}/>
                    <Carousel
                        sx={{overflow: "visible", width: "100%"}}
                        navButtonsAlwaysVisible={true}
                        cycleNavigation={true}
                        onChange={(now) => {
                            if (images.length <= 3) {
                                const firstImage: string = groupedImages[now as number].shift() as string;
                                groupedImages[now as number].push(firstImage);
                            }
                            const activeImage = groupedImages[now as number].length > 1 ? groupedImages[now as number][1] : groupedImages[now as number][0];
                            this.props.setActiveImage(activeImage);
                        }}
                        autoPlay={false}
                        changeOnFirstRender={true}
                        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                            style: {
                                bottom: '360px',
                                top: 'unset',
                            }
                        }}
                    >
                        {groupedImages.map((group, idx) => (
                            <Box key={idx} sx={{display: "flex", justifyContent: "center", borderRadius: "15px"}}>
                                {group.map((image, idx) => (
                                    <img
                                        src={image}
                                        alt="animal thumbnail"
                                        key={image}
                                        data-index={idx}
                                        data-testid={`animal-thumbnail-${idx}`}
                                        height="100px"
                                        style={{
                                            borderRadius: group.length === 1 ? "15px" :
                                                group.length === 2 && idx === 0 ? "15px 0 0 15px" :
                                                    group.length === 2 && idx === 1 ? "0 15px 15px 0" :
                                                        idx === 0 ? "15px 0 0 15px" :
                                                            idx === 2 ? "0 15px 15px 0" : "0",
                                        }}
                                    />
                                ))}
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        );
    }
}

export default CarouselComponent;
