import {type QueryStatus, useQuery} from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import {Animal} from "./APIResponsesTypes";

function useBreedList(animal: Animal): [string[], QueryStatus] {
    const results = useQuery(["breeds", animal], fetchBreedList);

    return [results?.data?.breeds ?? [], results.status];
}

export default useBreedList;
