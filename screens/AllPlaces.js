import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList"
import { fetchPlaces } from "../util/database";

function AllPlaces({ route })
{
    const [LoadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {

        async function loadPlaces()
        {
          const places =  await fetchPlaces()
          setLoadedPlaces(places)
        }

        if(isFocused)
        {
            loadPlaces();
            // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        }

    }, [isFocused]);

    return <PlacesList places={LoadedPlaces} />
}

export default AllPlaces