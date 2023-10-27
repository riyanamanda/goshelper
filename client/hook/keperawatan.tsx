import api from '@/config/axios';
import { useEffect, useState } from 'react';

export const useKeperawatan = () => {
    const [indikator, setIndikator] = useState();
    const [isLoading, setIsLaading] = useState(true);

    const getIndikator = async () => {
        setIsLaading(true);

        await api
            .get('/api/keperawatan')
            .then((response) => setIndikator(response.data.data))
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLaading(false);
            });
    };

    useEffect(() => {
        getIndikator();
    }, []);

    return {
        indikator,
        isLoading,
    };
};
