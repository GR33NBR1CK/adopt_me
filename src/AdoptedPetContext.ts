import { createContext } from "react";
import {Pet} from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[(Pet & {activeImage: string}) | null, (adoptedPet: Pet & {activeImage: string}) => void]>([
    {
        activeImage: "",
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
