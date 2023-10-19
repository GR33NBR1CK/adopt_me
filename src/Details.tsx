import { useContext, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import fetchPet from "./fetchPet";
import CarouselComponent from "./CarouselComponent";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";

import {PetAPIResponse} from "./APIResponsesTypes";
import {Box, Button, ButtonGroup, Card, CardContent, Divider, Modal, Typography} from "@mui/material";
import styled from "styled-components";


//Styled Components
const StyledBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  gap: 60px;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 1280px) {
    justify-content: center;
    gap: 20px;
  }
`

const ModalContent = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(210, 235, 248, 0.9);
  padding: 30px;
  border-radius: 30px;
`

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const [activeImage, setActiveImage] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    if (!id) {
        throw new Error(`ID is undefined`);
    }

    const results = useQuery<PetAPIResponse>(["details", id], fetchPet);

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }

    const pet = results?.data?.pets[0];

    if (!pet) {
        throw new Error('Pet not found')
    }

    return (
        <StyledBox>
            <CarouselComponent
                activeImage={activeImage}
                setActiveImage={setActiveImage}
                images={pet.images}
            />
            <Box sx={{maxWidth: "850px", width: "100%"}} mb={20}>
                <Card sx={{backgroundColor: "#d2ebf8"}}>
                    <CardContent sx={{display: "flex", flexDirection: "column", padding: "40px"}}>
                        <Typography variant="h1">{pet.name}</Typography>
                        <Typography variant="h3"
                                    gutterBottom>{pet.breed} {pet.animal} from {pet.city}, {pet.state}</Typography>
                        <Divider/>

                        <br/>
                        <Typography variant="body1" mb={5}>{pet.description}</Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                setShowModal(true);
                            }}
                            sx={{alignSelf: "center"}}
                        >
                            Adopt {pet.name}
                        </Button>
                    </CardContent>
                </Card>

                <Modal open={showModal} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <ModalContent>
                        <Typography variant="h2">Would you like to adopt {pet.name}?</Typography>
                        <ButtonGroup size="large" aria-label="large button group">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setAdoptedPet({...pet, activeImage});
                                    navigate("/");
                                }}
                            >
                                Yes!
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                No
                            </Button>
                        </ButtonGroup>
                    </ModalContent>
                </Modal>

            </Box>
        </StyledBox>
    );
};

function DetailsErrorBoundary() {
    return (
        <ErrorBoundary>
            <Details/>
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;
