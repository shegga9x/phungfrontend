import { cartState, gHNAvailableServicesSelectedState } from "@/atoms";
import NextLink from 'next/link';

import { shoppingCartItemProps } from "@/const";
import { GHNAvailableServicesDTO } from "@/models/backend";
import { getAvailableServicesQuery } from "@/selectors";
import { Select } from "@mantine/core";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";

export function AvailableServices(props: any) {
    const gHNAvailableServicesDTOs = useRecoilValueLoadable(getAvailableServicesQuery);
    const [gHNAvailableServicesDTOsRef, setGHNAvailableServicesDTOsRef] = React.useState<GHNAvailableServicesDTO[]>([]);
    const [gHNAvailableServicesSelected, setGHNAvailableServicesSelected] = useRecoilState(gHNAvailableServicesSelectedState);
    const [flag, setFlag] = React.useState(0);
    const setShoppingCart = useSetRecoilState(cartState);

    useEffect(() => {
        setShoppingCart((oldShoppingCart) => {
            return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
                { prev.push({ ...item, shippingFee: null }); } return prev;
            }, []);
        });
    }, [gHNAvailableServicesSelected]);
    if (flag === 0) {
        if (gHNAvailableServicesDTOs.state === "hasValue"
            && gHNAvailableServicesDTOs.contents?.content) {
            setGHNAvailableServicesDTOsRef(gHNAvailableServicesDTOs.contents.content);
            setFlag(1);
        } if (gHNAvailableServicesDTOs.state === "loading") {
            return (
                <div className='flex items-center justify-center'>
                    <span className='loading loading-bars loading-lg'></span>
                </div>);
        } else {
            return (
                <NextLink className=' btn btn-error flex items-center justify-center' href='/location'>
                    Please update your location
                </NextLink>)
        }
    } else {
        return (
            <div className='flex items-center'>
                <label className='font-bold text-1 mr-2'>Available shipping services :</label>
                <Select
                    placeholder="Pick one"
                    data={gHNAvailableServicesDTOsRef.map((item) => ({
                        value: item.serviceId.toString(),
                        label: "GHN - " + item.shortName,
                    }))}
                    value={gHNAvailableServicesSelected ? gHNAvailableServicesSelected.toString() : null}
                    onChange={(value) => setGHNAvailableServicesSelected(value ? parseInt(value) : null)}
                />
            </div>
        );
    }
}