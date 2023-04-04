import { useEffect, useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { useRouter } from 'next/router';

import { client } from '../api';
import { TFilterBuildingQuery, TResponse } from '../models/common';

export const useAxiosErrorHandle = () => {
    const router = useRouter();

    return (error: AxiosError | any) => {
        console.log('error', error);
        if (isAxiosError(error)) {
            console.log(error.response?.status);
            if (error.response && error.response?.status === 401) {
                router.push('/');
            }
        }
    };
};

export const useFilterBuildings = (filter: TFilterBuildingQuery) => {
    const [data, setData] = useState<TResponse>();
    const [F, setF] = useState<TFilterBuildingQuery>();
    const [isLoading, setIsLoading] = useState(false);
    const axiosErrorHandler = useAxiosErrorHandle();
    useEffect(() => {
        setF(filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        const controller = new AbortController();

        if (F) {
            setIsLoading(true);
            client.common
                .filterBuildings(F, controller.signal)
                .then(({ data }) => {
                    setData(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    axiosErrorHandler(err);
                    setIsLoading(false);
                });
        }

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [F]);

    return { data, isLoading };
};

export const useGetCommonInfo = (filter: TFilterBuildingQuery) => {
    const [data, setData] = useState<TResponse>();
    const [F, setF] = useState<TFilterBuildingQuery>();

    const axiosErrorHandler = useAxiosErrorHandle();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setF(filter);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        const controller = new AbortController();

        if (F) {
            client.common
                .getBuildingsInfo(F, controller.signal)
                .then(({ data }) => {
                    setData(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    axiosErrorHandler(err);
                    setIsLoading(false);
                });
        }

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [F]);

    return { data, isLoading };
};
