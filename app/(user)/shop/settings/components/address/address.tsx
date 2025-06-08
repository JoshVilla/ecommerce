import React, { useEffect, useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  Info,
  LocateIcon,
  PenIcon,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBarangay,
  getCityOrMunicipality,
  getProvince,
  getRegion,
} from "@/app/(user)/shop/settings/components/address/addressApi";
import {
  IAddress,
  IBarangay,
  ICityOrMunicipality,
  IProvince,
  IRegion,
} from "@/app/(user)/shop/settings/components/address/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { INewAddress, IUser } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddress,
  setDefaultAddress,
} from "@/service/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dispatchSetDefaultAddress } from "@/redux/slices/userSlice";

const Address = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.user as IUser);
  const userId = userState?._id;

  const [address, setAddress] = useState<IAddress>({
    region: "",
    province: "",
    city: "",
    barangay: "",
    addressInfo: "",
    regionCode: "",
    provinceCode: "",
    cityCode: "",
    barangayCode: "",
    otherAddress: "",
  });

  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [citiesOrMunicipalities, setCitiesOrMunicipalities] = useState<
    ICityOrMunicipality[]
  >([]);
  const [barangays, setBarangays] = useState<IBarangay[]>([]);

  const didMountRegion = useRef(false);
  const didMountProvince = useRef(false);
  const didMountCity = useRef(false);

  useEffect(() => {
    getRegion().then((res) => setRegions(res));
  }, []);

  useEffect(() => {
    if (!didMountRegion.current) {
      didMountRegion.current = true;
      return;
    }
    if (address.regionCode) {
      getProvince(address.regionCode).then(setProvinces);
    }
  }, [address.regionCode]);

  useEffect(() => {
    if (!didMountProvince.current) {
      didMountProvince.current = true;
      return;
    }
    if (address.provinceCode) {
      getCityOrMunicipality(address.provinceCode).then(
        setCitiesOrMunicipalities
      );
    }
  }, [address.provinceCode]);

  useEffect(() => {
    if (!didMountCity.current) {
      didMountCity.current = true;
      return;
    }
    if (address.cityCode) {
      getBarangay(address.cityCode).then(setBarangays);
    }
  }, [address.cityCode]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userAddress"],
    queryFn: () => getUserAddress({ userId: userId }),
  });

  const addressMutation = useMutation({
    mutationFn: addUserAddress,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        clearForm();
        refetch();
        setOpenAddressForm(false);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Failed to add address. Please try again.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Failed to delete address. Please try again.");
    },
  });

  const defaultAddressMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();

        //update default address in redux
        dispatch(dispatchSetDefaultAddress(data.data));
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleSaveAddress = () => {
    const userAddress = {
      ...address,
      userId,
      isDefaultAddress: false,
    };
    addressMutation.mutate({ userAddress });
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteMutation.mutate({ addressId });
  };

  const handleUpdateDefaultAddress = (addressId: string) => {
    defaultAddressMutation.mutate({ addressId, userId });
  };

  const clearForm = () => {
    setAddress({
      region: "",
      province: "",
      city: "",
      barangay: "",
      addressInfo: "",
      regionCode: "",
      provinceCode: "",
      cityCode: "",
      barangayCode: "",
      otherAddress: "",
    });
    setProvinces([]);
    setCitiesOrMunicipalities([]);
    setBarangays([]);

    didMountCity.current = false;
    didMountProvince.current = false;
    didMountRegion.current = false;
  };

  const renderAddressList = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!data) {
      return <div>No address found.</div>;
    }
    return data?.data.map((address: INewAddress, index: number) => (
      <div
        className="border w-full p-4 mt-4 space-y-2"
        style={{
          border: `${
            address.isDefaultAddress ? "2px solid skyblue" : undefined
          }`,
        }}
        key={index}
      >
        {address.isDefaultAddress && <Badge>Default</Badge>}
        <div className="text-sm text-gray-600">
          {`${address.region}, ${address.province}, ${address.city}, ${address.barangay}`}
        </div>
        <div className="text-sm text-gray-600">{`${address.otherAddress}`}</div>
        <div className="text-sm text-gray-600">{`${address.addressInfo}`}</div>
        <div className="flex justify-end gap-2">
          {" "}
          {/* <EditAddress record={address} /> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer hover:scale-105 text-blue-400"
                  onClick={() => handleUpdateDefaultAddress(address._id)}
                >
                  <LocateIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Set to default address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer hover:scale-105 text-red-400"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="my-6 border-2">
        <div className="w-full flex items-center justify-between bg-sky-100 p-2">
          <div className="text-md">Add Address</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenAddressForm((prev) => !prev)}
            className="cursor-pointer"
          >
            {!openAddressForm ? <ArrowDown /> : <ArrowUp />}
          </Button>
        </div>

        <div className={`p-2 ${openAddressForm ? "block" : "hidden"}`}>
          <div className="flex items-center gap-2 text-gray-500 text-xs my-2">
            <Info height={20} />
            This address will be used as your delivery address.
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              {/* REGION */}
              <Select
                value={address.regionCode}
                onValueChange={(val) => {
                  const region = regions.find((v) => v.code === val);
                  if (region) {
                    setAddress((prev) => ({
                      ...prev,
                      region: `${region.regionName} (${region.name})`,
                      regionCode: region.code,
                      provinceCode: "",
                      cityCode: "",
                      barangayCode: "",
                    }));
                    setProvinces([]);
                    setCitiesOrMunicipalities([]);
                    setBarangays([]);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select a Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Regions</SelectLabel>
                    {regions.map((region) => (
                      <SelectItem key={region.code} value={region.code}>
                        {`${region.regionName} (${region.name})`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* PROVINCE */}
              <Select
                value={address.provinceCode}
                onValueChange={(val) => {
                  const province = provinces.find((v) => v.code === val);
                  if (province) {
                    setAddress((prev) => ({
                      ...prev,
                      province: province.name,
                      provinceCode: province.code,
                      cityCode: "",
                      barangayCode: "",
                    }));
                    setCitiesOrMunicipalities([]);
                    setBarangays([]);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select a Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {provinces.length > 0
                        ? "List of Provinces"
                        : "No List of Provinces"}
                    </SelectLabel>
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* CITY / MUNICIPALITY */}
              <Select
                value={address.cityCode}
                onValueChange={(val) => {
                  const city = citiesOrMunicipalities.find(
                    (v) => v.code === val
                  );
                  if (city) {
                    setAddress((prev) => ({
                      ...prev,
                      city: city.name,
                      cityCode: city.code,
                      barangayCode: "",
                    }));
                    setBarangays([]);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select a City or Municipality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {citiesOrMunicipalities.length > 0
                        ? "List of Cities/Municipalities"
                        : "No List of Cities/Municipalities"}
                    </SelectLabel>
                    {citiesOrMunicipalities.map((city) => (
                      <SelectItem key={city.code} value={city.code}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* BARANGAY */}
              <Select
                value={address.barangayCode}
                onValueChange={(val) => {
                  const barangay = barangays.find((v) => v.code === val);
                  if (barangay) {
                    setAddress((prev) => ({
                      ...prev,
                      barangay: barangay.name,
                      barangayCode: barangay.code,
                    }));
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select a Barangay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {barangays.length > 0
                        ? "List of Barangays"
                        : "No List of Barangays"}
                    </SelectLabel>
                    {barangays.map((barangay) => (
                      <SelectItem key={barangay.code} value={barangay.code}>
                        {barangay.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* OTHER ADDRESS INPUTS */}
            <Input
              placeholder="Enter your Purok/Street/House No."
              value={address.otherAddress}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  otherAddress: e.target.value,
                }))
              }
            />

            <Textarea
              placeholder="Add more information about your address. Eg: Landmarks"
              value={address.addressInfo}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, addressInfo: e.target.value }))
              }
            />

            <Button
              onClick={handleSaveAddress}
              size="sm"
              disabled={addressMutation.isPending}
            >
              {addressMutation.isPending ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
      <div>List of Address</div>
      <div>{renderAddressList()}</div>
    </div>
  );
};

export default Address;
