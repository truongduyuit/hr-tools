const branches = require("./configs/branch.json");
const fs = require("fs")

const addressGBProvinceDistrict = branches.map((item) => {return {
    ...item,
    province: "",
    district: "",
    detail: ""
} });

fs.writeFileSync("branches.json", JSON.stringify(addressGBProvinceDistrict))