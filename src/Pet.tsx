import {Link} from "react-router-dom";
import {FC} from "react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import styled from "styled-components";

interface PetProps {
    name: string;
    id: number;
    breed: string;
    animal: string;
    location: string;
    images: string[];
    description: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledCard = styled(Card)`
  max-width: 345px;
  transition: scale 200ms ease-in-out;
  text-align: center;
  &:hover {
    scale: 105%;
  }
`

const CardDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Number of lines to show */
  -webkit-box-orient: vertical;
`

const StyledCardContent = styled(CardContent)`
  height: 170px;
`

const Pet: FC<PetProps> = ({name, id, breed, animal, location, images, description}) => {
    const hero = images && images.length
        ? images[0]
        : "https://pets-images.dev-apis.com/pets/none.jpg";

    return (
        <>
            <Grid item lg={3} md={4} sm={6} xs={12} sx={{display: "flex", justifyContent: "center"}}>
                <StyledLink className="" to={`/details/${id}`}>
                    <StyledCard>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={hero}
                                alt={name}
                                data-testid="thumbnail"
                            />

                            <StyledCardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {name} <br /> {breed} {animal}
                                </Typography>
                                <CardDescription variant="body2" color="text.secondary">
                                    {description}
                                </CardDescription>
                            </StyledCardContent>
                        </CardActionArea>
                    </StyledCard>
                </StyledLink>
            </Grid>
        </>
    );
};

export default Pet;
