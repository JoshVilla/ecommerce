export const getRegion = async () => {
    try {
        const response = await fetch("https://psgc.gitlab.io/api/regions/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
};

export const getProvince = async (regionCode:string) => {
    try {
        const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
};

export const getCityOrMunicipality = async (provinceCode:string) => {
    try {
        const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
};

export const getBarangay = async (cityCode:string) => {
    try {
        const response = await fetch(`https://psgc.gitlab.io/api/municipalities/${cityCode}/barangays/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
};
