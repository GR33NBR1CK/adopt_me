import {type QueryFunction} from "@tanstack/react-query";
import {PetAPIResponse} from "./APIResponsesTypes";
import {type RequestParams} from "./SearchParams";

const fetchSearch: QueryFunction<PetAPIResponse> = async ({ queryKey }) => {
    const { animal, breed, location } = queryKey[1] as RequestParams;
    const response = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    if (!response.ok) {
        throw new Error(`pet search not OK ${animal} - ${breed} - ${location}`);
    }

    return response.json();
}

export default fetchSearch;
