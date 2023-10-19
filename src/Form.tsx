import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import styled from "styled-components";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {FC, FormEvent, useEffect, useState} from "react";
import {Animal, Pet} from "./APIResponsesTypes";


const StyledForm = styled(Box)`
  background-color: #d2ebf8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 45px 20px 20px;
  position: relative;
  img {
    width: 360px;
    position: absolute;
    z-index: 1;
    top: -285px;
  }
`;

const StyledTextField = styled(TextField)`
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid grey;
  border-bottom: none;

  input {
    padding-top: 20px;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  top: -3px
`;

const StyledSelect = styled(Select)`
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid grey;
  border-bottom: none;
`;

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

import {type RequestParams} from "./SearchParams";

interface FormProps {
    setRequestParams: (data: RequestParams) => void,
    animal: Animal,
    updateAnimal: (animal: Animal) => void,
    adoptedPet: (Pet & {
        activeImage: string
    }) | null,
    breeds: string[],
    breedsStatus: "loading" | "error" | "success",
}

const Form: FC<FormProps> = ({setRequestParams, animal, updateAnimal, breeds, breedsStatus}) => {
    const [breed, setBreed] = useState("")

    useEffect(() => {
        if (breedsStatus === "success") {
            setBreed(breeds[0])
        }
    }, [breeds])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
        }
        setRequestParams(data);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <StyledForm>
            <img src="assets/pinpng.com-cachorro-png-6275252_2_1000x936_200.png" alt=""/>

                <StyledTextField
                    type="search"
                    name="location"
                    variant="filled"
                    id="location"
                    size="small"
                    label="Location (optional)"
                    fullWidth
                    placeholder="Enter location"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnOutlinedIcon/>
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl variant="filled">
                    <StyledInputLabel id="demo-simple-select-label">Animal</StyledInputLabel>
                    <StyledSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Animal"
                        size="small"
                        defaultValue={animal}
                        value={animal}
                        onChange={(event) => {
                            updateAnimal(event.target.value as Animal);
                            setBreed("")
                        }}
                    >
                        {ANIMALS.map((animal) => (
                            <MenuItem key={animal} value={animal}>
                                {animal}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>

                <FormControl variant="filled">
                    <StyledInputLabel id="demo-simple-select-label">Breed</StyledInputLabel>
                    <StyledSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Breed"
                        size="small"
                        disabled={!breeds.length}
                        name="breed"
                        value={breedsStatus === "loading" ? 0 : breed}
                        onChange={(e) => setBreed(e.target.value as string)}
                    >

                        {/*{breeds.map((breed) => (*/}
                        {/*    <MenuItem key={breed} value={breed}>*/}
                        {/*        {breed}*/}
                        {/*    </MenuItem>))}*/}

                        {/*{breedsStatus === "loading" ? (*/}
                        {/*    <MenuItem value={0} disabled>*/}
                        {/*        Loading...*/}
                        {/*    </MenuItem>*/}
                        {/*) : (*/}
                        {/*    breeds.map((breed) => (*/}
                        {/*        <MenuItem key={breed} value={breed}>*/}
                        {/*            {breed}*/}
                        {/*        </MenuItem>*/}
                        {/*    ))*/}
                        {/*)}*/}

                        {breedsStatus === "loading" && (<MenuItem value={0} disabled>
                            Loading...
                        </MenuItem>)}
                        {breeds.map((breed) => (
                            <MenuItem key={breed} value={breed}>
                                {breed}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                >
                    Search
                </Button>
            </StyledForm>

        </form>
    );
}

export default Form;