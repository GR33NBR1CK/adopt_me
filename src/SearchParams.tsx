import {FC, FormEvent, useContext, useState} from "react";

import { useQuery } from "@tanstack/react-query";

import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import {Animal, Pet} from "./APIResponsesTypes";

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
    const [breeds] = useBreedList(animal);
    const results = useQuery(["search", requestParams], fetchSearch);
    const [adoptedPet] = useContext(AdoptedPetContext);

    const pets: Pet[] = results?.data?.pets ?? [];
    return (
        <div className="search-params my-0 mx-auto w-11/12">
            <form
                className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const data = {
                        animal: formData.get("animal")?.toString() ?? "",
                        breed: formData.get("breed")?.toString() ?? "",
                        location: formData.get("location")?.toString() ?? "",
                    };
                    setRequestParams(data);
                }}
            >
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img
                            src={adoptedPet?.images[adoptedPet.activeImage ?? 0]}
                            alt={adoptedPet?.name}
                        />
                    </div>
                ) : null}
                <label htmlFor="location">Location</label>
                <input
                    name="location"
                    type="text"
                    id="location"
                    placeholder="location"
                />
                <label htmlFor="animal">Animal</label>
                <select
                    className="search-input"
                    id="animal"
                    value={animal}
                    onChange={(event) => {
                        updateAnimal(event.target.value as Animal);
                    }}
                >
                    {ANIMALS.map((animal) => (
                        <option key={animal} value={animal}>
                            {animal}
                        </option>
                    ))}
                </select>

                <label htmlFor="breed">Breed</label>
                <select
                    className="search-input grayed-out-disabled"
                    id="breed"
                    disabled={!breeds.length}
                    name="breed"
                >
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500"
                >
                    Submit
                </button>
            </form>

            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
