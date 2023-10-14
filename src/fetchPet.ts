import {PetAPIResponse} from "./APIResponsesTypes";
import {type QueryFunction} from "@tanstack/react-query";
const fetchPet: QueryFunction<PetAPIResponse> = async (
    {queryKey},
)  => {

    const id = queryKey[1] as string | undefined
    const apiResponse = await fetch(
        `https://pets-v2.dev-apis.com/pets?id=${id}`
    );

    if (!apiResponse.ok) {
        throw new Error(`details/${id} fetch not OK`);
    }

    return (await apiResponse.json()) as PetAPIResponse
}

export default fetchPet;
