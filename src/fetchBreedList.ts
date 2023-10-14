import {type QueryFunction} from "@tanstack/react-query";
import {Animal, BreedListAPIResponse} from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<BreedListAPIResponse> = async ({ queryKey }) => {
    const [path, animal] = queryKey as [string, Animal];
    if (!animal) return [];

    const response = await fetch(
        `https://pets-v2.dev-apis.com/${path}?animal=${animal}`
    );

    if (!response.ok) {
        throw new Error(`breeds ${animal} fetch not ok`);
    }

    return response.json();
}

export default fetchBreedList;
