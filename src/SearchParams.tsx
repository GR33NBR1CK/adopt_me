import {FC, useContext, useState} from "react";

import {useQuery} from "@tanstack/react-query";

import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import {Animal, Pet} from "./APIResponsesTypes";
import Form from "./Form";
import {Box, Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  min-height: 70vh;
  position: relative;
  display: flex;
  width: 100%;

  form {
    position: relative;
    top: 50%;
    width: 600px;
  }

  @media (max-width: 1280px) {
    min-height: 30vh;
    margin-top: 300px;
    flex-direction: column;
    align-items: center;

    form {
      width: 100%;
    }
  }


`;

const ImageContainer = styled.div`
  background-image: url('./assets/5847f60fcef1014c0b5e48a2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom right;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) and (max-width: 960px) {
    background: none;
    height: 50%;
  }

  @media (max-width: 600px) {
    background: none;
  }

  @media (min-width: 960px) and (max-width: 1280px) {
    background: none;
  }

  @media (min-width: 1200px) {
    background-size: 80%;
    background-position: bottom right;
  }

  @media (min-width: 1536px) {
    background-size: contain;
    background-position: bottom right;
  }
`;

const HeroText = styled.div`
  margin-top: 82px;
  padding-inline: 40px;
  position: relative;
  left: -186px;

  h2 {
    font-weight: 900;
    margin-bottom: 30px;

  }

  h4 {
    font-weight: 700;
  }

  @media (min-width: 601px) {
    margin-top: 100px;

    h2 {
      font-size: 80px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    h4 {
      font-size: 28px;
    }
  }

  @media (max-width: 1280px) {
    margin-top: 20px;
    text-align: center;
    left: 0;

    h2 {
      font-size: 60px;
    }

    h4 {
      font-size: 24px;
    }
  }

`;

const FormBox = styled(Grid)`
  @media (max-width: 1280px) {
    width: 100%;
  }
`

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

export interface RequestParams {
    location: string;
    animal: string;
    breed: string;
}

const SearchParams: FC = () => {
    const [requestParams, setRequestParams] = useState<RequestParams>({
        location: "",
        animal: "",
        breed: "",
    });
    const [animal, updateAnimal] = useState<Animal>(ANIMALS[0]);
    const [breeds, breedsStatus] = useBreedList(animal);
    const results = useQuery(["search", requestParams], fetchSearch);
    const [adoptedPet] = useContext(AdoptedPetContext);

    const pets: Pet[] = results?.data?.pets ?? [];
    return (
        <Container maxWidth="xl">
            <StyledGrid container>
                <FormBox>
                    <Form
                        setRequestParams={setRequestParams}
                        animal={animal}
                        updateAnimal={updateAnimal}
                        adoptedPet={adoptedPet}
                        breeds={breeds}
                        breedsStatus={breedsStatus}
                    />
                </FormBox>

                <Grid sx={{flexGrow: 1}}>
                    <ImageContainer>
                        <HeroText>
                            <Typography variant="h1" component="h2">
                                Adopt a pet.
                            </Typography>
                            <Typography variant="h4">
                                {/*Provide a happy home*/}
                            </Typography>
                        </HeroText>
                    </ImageContainer>
                </Grid>
            </StyledGrid>

            {adoptedPet ? (
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Card sx={{maxWidth: 500, borderRadius: 10}}>
                    <Typography variant="h3" component="div" sx={{padding: "20px", textAlign: "center"}}>
                        Adopted pet - {adoptedPet.name}
                    </Typography>
                    <CardMedia
                        component="img"
                        image={adoptedPet.activeImage}
                        alt={adoptedPet?.name}
                    />

                    <CardContent>
                        <Typography variant="h5" component="div" sx={{padding: "20px"}}>
                            Adopted pet - {adoptedPet.description}
                        </Typography>
                    </CardContent>
                </Card></Box>
                ) : null}

            <Results pets={pets}/>
        </Container>
    );
};

export default SearchParams;
