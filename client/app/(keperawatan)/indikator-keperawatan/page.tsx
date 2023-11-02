'use client';

import Loading from '@/components/Loading';
import { KeperawatanDataTable } from './data-table';
import { columnsKeperawatan } from './columns';
import { useKeperawatan } from '@/hook/keperawatan';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm, FieldValues } from 'react-hook-form';
import InputError from '@/components/InputError';
import api from '@/config/axios';
import { Textarea } from '@/components/ui/textarea';

const Keperawatan = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();
    const { indikator: data, isLoading, store } = useKeperawatan();
    let [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [jenis, setJenis] = useState<any>();

    const submit = async (data: FieldValues) => {
        store({ data, setErrors, setIsOpen, reset });
    };

    const getJenis = async () => {
        await api
            .get('api/keperawatan/jenis')
            .then((response) => setJenis(response.data.data))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getJenis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='mt-5'>
            <h1 className='mb-10 font-bold text-md text-center'>
                Daftar Indikaor Asuhan Keperawatan
            </h1>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className='mb-5 flex items-center justify-end'>
                        <Button
                            className='space-x-2 bg-sky-500 hover:bg-sky-700'
                            size='sm'
                            onClick={() => setIsOpen(true)}
                        >
                            <FaPlus />
                            <span>Tambah</span>
                        </Button>
                    </div>

                    <KeperawatanDataTable
                        columns={columnsKeperawatan}
                        data={data}
                    />

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as='div'
                            className='relative z-10'
                            onClose={() => setIsOpen(false)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <div className='fixed inset-0 bg-black/25' />
                            </Transition.Child>

                            <div className='fixed inset-0 overflow-y-auto'>
                                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                    <Transition.Child
                                        as={Fragment}
                                        enter='ease-out duration-300'
                                        enterFrom='opacity-0 scale-95'
                                        enterTo='opacity-100 scale-100'
                                        leave='ease-in duration-200'
                                        leaveFrom='opacity-100 scale-100'
                                        leaveTo='opacity-0 scale-95'
                                    >
                                        <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg font-medium leading-6 text-gray-900'
                                            >
                                                Tambah Indikator Baru
                                            </Dialog.Title>

                                            <form
                                                onSubmit={handleSubmit(submit)}
                                                className='my-5'
                                            >
                                                <div className='mb-3'>
                                                    <select
                                                        className='w-full border p-2 rounded'
                                                        {...register('jenis')}
                                                    >
                                                        <option
                                                            value=''
                                                            selected
                                                        />
                                                        {jenis?.map(
                                                            (item: any) => (
                                                                <option
                                                                    value={
                                                                        item.id
                                                                    }
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {
                                                                        item.deskripsi
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <InputError
                                                        messages={errors.jenis}
                                                        className='mt-1'
                                                    />
                                                </div>

                                                <div>
                                                    <Textarea
                                                        {...register(
                                                            'indikator'
                                                        )}
                                                    />
                                                    <InputError
                                                        messages={
                                                            errors.indikator
                                                        }
                                                        className='mt-1'
                                                    />
                                                </div>

                                                <div className='mt-4 text-right'>
                                                    <Button
                                                        className='bg-sky-500 hover:bg-sky-700'
                                                        disabled={isSubmitting}
                                                    >
                                                        Simpan
                                                    </Button>
                                                </div>
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </>
            )}
        </div>
    );
};

export default Keperawatan;
