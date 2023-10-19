import {FC} from "react";

import Pet from "./Pet";
import {type Pet as IPet} from "./APIResponsesTypes";
import {Grid} from "@mui/material";

interface ResultsProps {
    pets: IPet[];
}

const Results: FC<ResultsProps> = ({ pets }) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {!pets.length ? (
                <h1>No pets found!</h1>
            ) : (
                <Grid container spacing={2} marginTop={3} sx={{flexGrow: 1}}>
                    {pets.map((pet) => (
                        <Pet
                            key={pet?.id}
                            name={pet?.name}
                            animal={pet?.animal}
                            breed={pet?.breed}
                            images={pet?.images}
                            location={`${pet?.city}, ${pet?.state}`}
                            id={pet?.id}
                            description={pet.description}
                        />
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Results;
