"use client";

import React from "react";
import { useAuthGuard } from "@/lib/auth/use-auth";
import Container from "@/components/container";
import { TextInput, Button, Select } from "@mantine/core";
import { useRecoilValueLoadable } from "recoil";
import { provinceListQuery, userShippingInfoQuery } from "@/selectors";
import { GHNDistrictDTO, GHNProvinceDTO, GHNWardDTO, ShippingInfoDTO } from "@/models/backend";
import { addShippingInfo, fetchAddressList } from "@/lib/http";
import { enqueueSnackbar } from "notistack";

export interface CreateOption {
  value: string;
  label: string;
}

export default function ProfilePage() {
  const { user } = useAuthGuard({ middleware: "auth" });

  const cityList = useRecoilValueLoadable(provinceListQuery);
  const shippingInfos = useRecoilValueLoadable(userShippingInfoQuery);

  const [shippingInfoDTO, setShippingInfoDTO] = React.useState<ShippingInfoDTO>();
  const [district, setDistrict] = React.useState<CreateOption[]>([]);
  const [ward, setWard] = React.useState<CreateOption[]>([]);
  const [selectedProvince, setSelectedProvince] = React.useState("0");
  const [selectedDistrict, setSelectedDistrict] = React.useState("0");
  const [selectedWard, setSelectedWard] = React.useState("0");
  const [flag, setFlag] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async (shippingInfoDTORef: ShippingInfoDTO | undefined) => {
      await handleSelectChange(shippingInfoDTORef?.provinceId?.toString() || "", "city");
      await handleSelectChange(shippingInfoDTORef?.disctrictId?.toString() || "", "district");
      setSelectedProvince(shippingInfoDTORef?.provinceId?.toString() || "0");
      setSelectedDistrict(shippingInfoDTORef?.disctrictId?.toString() || "0");
      setSelectedWard(shippingInfoDTORef?.wardCode?.toString() || "0");
    }
    if (shippingInfos.state === "hasValue"
      && shippingInfos.contents?.content
      && shippingInfos.contents.content.length > 0
      && flag == false) {
      setShippingInfoDTO(shippingInfos.contents.content[0]);
      fetchData(shippingInfos.contents?.content[0]);
      setFlag(true);
    }
  }, [shippingInfos]);

  let options = [];
  switch (cityList.state) {
    case "hasValue":
      options = cityList.contents?.content?.map((province: GHNProvinceDTO) => ({
        value: province.provinceID?.toString() || "",
        label: province.provinceName || "",
      })) || [];
      break;
    case "loading":
      options = [{ value: "0", label: "Loading..." }];
      break;
    case "hasError":
      options = [{ value: "0", label: "Error loading options" }];
      break;
  }
  const handleSelectChange = async (value: string, type: String) => {
    switch (type) {
      case "city":
        setSelectedDistrict("0");
        setSelectedWard("0");
        setDistrict([{ value: "0", label: "Loading..." }]);
        setWard([{ value: "0", label: "Loading..." }]);
        const districtDTOs: GHNDistrictDTO[] = (await fetchAddressList("district", Number(value))).content || [];
        setDistrict(districtDTOs.map((district) => ({
          value: district.districtID?.toString() || "",
          label: district.districtName || "",
        })));

        break;
      case "district":
        setSelectedWard("0");
        setWard([{ value: "0", label: "Loading..." }]);
        const wardDTOs: GHNWardDTO[] = (await fetchAddressList("ward", Number(value))).content || [];
        setWard(wardDTOs.map((ward) => ({
          value: ward.wardCode?.toString() || "",
          label: ward.wardName || "",
        })));
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const shippingInfo: ShippingInfoDTO = {
      name: formData.get("full-name") as string,
      phoneNumber: formData.get("phone-number") as string,
      provinceId: Number(formData.get("province")),
      disctrictId: Number(formData.get("disctrict")),
      wardCode: Number(formData.get("ward")),
      address: formData.get("address") as string,
      userId: Number(user?.id),
      id: shippingInfoDTO?.id,
    };
    const req = await addShippingInfo(shippingInfo);
    if (req.error) {
      enqueueSnackbar(req.error.message, { variant: "error" });
    } else {
      enqueueSnackbar("Update shipping address successfully", { variant: "success" });
    }
  };
  return (
    <Container size="sm">
      <h1 className="text-center font-bold text-2xl">Your shipping information</h1>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextInput name="full-name" label="Full Name" defaultValue={shippingInfoDTO?.name} required />
        <TextInput name="phone-number" label="Phone Number" defaultValue={shippingInfoDTO?.phoneNumber} required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select name="province"
            label="Province"
            placeholder="Select an option"
            value={selectedProvince}
            data={options}
            onChange={(value) => {
              setSelectedProvince(value ?? "");
              handleSelectChange(value ?? "", "city")
            }}
          />
          <Select name="disctrict" label="Disctrict"
            value={selectedDistrict}
            placeholder="Select one"
            onChange={(value) => {
              setSelectedDistrict(value ?? "");
              handleSelectChange(value ?? "", "district")
            }}
            data={district}
          />
          <Select label="ward"
            name="ward"
            value={selectedWard}
            placeholder="Select one"
            data={ward}
            onChange={(value) => {
              setSelectedWard(value ?? "");
            }} />
          <TextInput name="address" label="Address" defaultValue={shippingInfoDTO?.address} required />
        </div>
        <Button type="submit" disabled={!selectedWard || selectedWard == "0"}>Update Shipping Address</Button>
      </form>
    </Container >
  );

}
