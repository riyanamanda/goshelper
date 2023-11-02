import { Toast } from '@/components/Toast';
import api from '@/config/axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

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

    const store = ({ data, setErrors, reset, setIsOpen }: any) => {
        setErrors([]);

        api.post('/api/keperawatan/store', data)
            .then((response) => {
                if (response.data.status === 200) {
                    Toast({
                        message: response.data.message,
                        title: 'Success',
                        icon: 'success',
                    });
                    setIsOpen(false);
                    reset();
                }
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else if (error.response.status === 403) {
                    Toast({
                        message: error.response.data,
                        title: 'Error',
                        icon: 'error',
                    });
                } else {
                    throw error;
                }
            });
    };

    useEffect(() => {
        getIndikator();
    }, []);

    return {
        indikator,
        getIndikator,
        store,
        isLoading,
    };
};
