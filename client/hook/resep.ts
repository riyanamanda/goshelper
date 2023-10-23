import axios from 'axios';
import { useEffect, useState } from 'react';

export const useResep = () => {
    const [resep, setResep] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getResep = async () => {
        setIsLoading(true);

        await axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resep`)
            .then((response: any) => {
                setResep(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateJadwal = async ({ data }: any) => {
        await axios
            .patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resep/detil/update`,
                { data }
            )
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getResep();
    }, []);

    return {
        resep,
        updateJadwal,
        isLoading,
    };
};
