import api from '@/config/axios';
import { useEffect, useState } from 'react';

export const useResep = () => {
    const [resep, setResep] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getResep = async () => {
        setIsLoading(true);

        await api
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

    const getDetilResep = async ({ no_resep, setDetil, setIsLoading }: any) => {
        setIsLoading(true);

        await api
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resep/${no_resep}/detil`
            )
            .then((response: any) => {
                setDetil(response.data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const getPrintResep = async ({ no_resep, setDetil, setIsLoading }: any) => {
        setIsLoading(true);

        await api
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resep/${no_resep}/print`
            )
            .then((response: any) => {
                setDetil(response.data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateJadwal = async ({ data }: any) => {
        await api
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
        getDetilResep,
        getPrintResep,
        updateJadwal,
        isLoading,
    };
};
