import { createContext } from "react";
import {Pet} from "./APIResponsesTypes";

const AdoptPetContext = createContext<[Pet, (adoptedPet: Pet) => void]>([
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function setAdoptedPet(adoptedPet: Pet){}
]);

export default AdoptPetContext;
