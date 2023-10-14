import { createContext } from "react";
import {Pet} from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
    {
        id: 1337,
        name: "Stefan",
        animal: "dog",
        description: "lorem ipsum dolor",
        breed: "Beagle",
        images: [],
        city: "Seattle",
        state: "WA"
    },
    function setAdoptedPet(){}
]);

export default AdoptedPetContext;
