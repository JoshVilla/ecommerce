import React, { useEffect, useState, useRef } from "react";
import { Info } from "lucide-react";
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
} from "@/app/(user)/shop/settings/components/addressApi";
import {
  IAddress,
  IBarangay,
  ICityOrMunicipality,
  IProvince,
  IRegion,
} from "@/app/(user)/shop/settings/components/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IUser } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { addUserAddress } from "@/service/api";
import { toast } from "sonner";

const Address = () => {
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
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [citiesOrMunicipalities, setCitiesOrMunicipalities] = useState<
    ICityOrMunicipality[]
  >([]);
  const [barangays, setBarangays] = useState<IBarangay[]>([]);

  const [regionCode, setRegionCode] = useState<string | null>(null);
  const [provinceCode, setProvinceCode] = useState<string | null>(null);
  const [cityOrMunicipalityCode, setCityOrMunicipalityCode] = useState<
    string | null
  >(null);
  const [barangayCode, setBarangayCode] = useState<string | null>(null);

  const didMountRegion = useRef(false);
  const didMountProvince = useRef(false);
  const didMountCity = useRef(false);

  useEffect(() => {
    getRegion().then((res) => {
      setRegions(res);
    });
  }, []);

  useEffect(() => {
    if (!didMountRegion.current) {
      didMountRegion.current = true;
      return;
    }

    if (regionCode !== null) {
      getProvince(address.regionCode).then((res: IProvince[]) => {
        setProvinces(res);
      });
    }
  }, [regionCode]);

  useEffect(() => {
    if (!didMountProvince.current) {
      didMountProvince.current = true;
      return;
    }

    if (provinceCode !== null) {
      getCityOrMunicipality(address.provinceCode).then(
        (res: ICityOrMunicipality[]) => {
          setCitiesOrMunicipalities(res);
        }
      );
    }
  }, [provinceCode]);

  useEffect(() => {
    if (!didMountCity.current) {
      didMountCity.current = true;
      return;
    }

    if (cityOrMunicipalityCode !== null) {
      getBarangay(address.cityCode).then((res: IBarangay[]) => {
        setBarangays(res);
      });
    }
  }, [cityOrMunicipalityCode]);

  const addressMutation = useMutation({
    mutationFn: addUserAddress,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        clearForm();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to add address. Please try again.");
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
    }),
      setRegionCode(null),
      setProvinceCode(null),
      setCityOrMunicipalityCode(null),
      setBarangayCode(null);
    setRegions([]),
      setProvinces([]),
      setCitiesOrMunicipalities([]),
      setBarangays([]);

    didMountCity.current = false;
    didMountProvince.current = false;
    didMountRegion.current = false;
  };

  return (
    <div className="my-6">
      <div className="text-md">Address</div>
      <div className="flex items-center gap-2 text-gray-500 text-xs my-2">
        <Info height={20} />
        This address will be used as your delivery address.
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Select
            onValueChange={(val) => {
              setRegionCode(val);
              const region = regions.find((v) => v.code === val);
              if (region) {
                setAddress((prev) => ({
                  ...prev,
                  region: `${region.regionName} (${region.name})`,
                  regionCode: region.code,
                }));
              }
            }}
          >
            <SelectTrigger className="w-[100%] sm:w-[300px]">
              <SelectValue placeholder="Select a Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Regions</SelectLabel>
                {regions.map((region: IRegion) => (
                  <SelectItem key={region.code} value={region.code}>
                    {`${region.regionName} (${region.name})`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => {
              setProvinceCode(val);
              const province = provinces.find((v) => v.code === val);
              if (province) {
                setAddress((prev) => ({
                  ...prev,
                  provinceCode: val,
                  province: province.name,
                }));
              }
            }}
          >
            <SelectTrigger className="w-[100%] sm:w-[300px]">
              <SelectValue placeholder="Select a Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {provinces.length > 0
                    ? "List of Provinces"
                    : "No List of Provinces"}
                </SelectLabel>
                {provinces.map((province: IProvince) => (
                  <SelectItem key={province.code} value={province.code}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => {
              setCityOrMunicipalityCode(val);
              const cityOrMunicipality = citiesOrMunicipalities.find(
                (v) => v.code === val
              );
              if (cityOrMunicipality) {
                setAddress((prev) => ({
                  ...prev,
                  cityCode: val,
                  city: cityOrMunicipality.name,
                }));
              }
            }}
          >
            <SelectTrigger className="w-[100%] sm:w-[300px]">
              <SelectValue placeholder="Select a City or Municipality" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {citiesOrMunicipalities.length > 0
                    ? "List of Cities/Municipalities"
                    : "No List of City/Municipalities"}
                </SelectLabel>
                {citiesOrMunicipalities.map((city: ICityOrMunicipality) => (
                  <SelectItem key={city.code} value={city.code}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => {
              setBarangayCode(val);
              const barangay = barangays.find((v) => v.code === val);
              if (barangay) {
                setAddress((prev) => ({
                  ...prev,
                  barangayCode: val,
                  barangay: barangay.name,
                }));
              }
            }}
          >
            <SelectTrigger className="w-[100%] sm:w-[300px]">
              <SelectValue placeholder="Select a Barangay" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {barangays.length > 0
                    ? "List of Barangays"
                    : "No List of Barangays"}
                </SelectLabel>
                {barangays.map((barangay: IBarangay) => (
                  <SelectItem key={barangay.code} value={barangay.code}>
                    {barangay.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="Enter your Purok/Street/House No."
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, otherAddress: e.target.value }))
          }
        />
        <div>
          <Textarea
            placeholder="Add more information about your address. Eg: Landmarks"
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, addressInfo: e.target.value }))
            }
          />
        </div>
        <Button onClick={handleSaveAddress}>Add Address</Button>
      </div>
    </div>
  );
};

export default Address;
