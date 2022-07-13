const branches = require("./configs/branch.json");
const fs = require("fs")

const addressGBProvinceDistrict = branches.reduce((maps, item) => {
    const { province, district } = item;

    if (province && district) {
        const key = `${province} - ${district}`;
        const group = maps[key] || [];
        group.push(item);
        maps[key] = group;
        return maps;
    }
}, {});

const addressMap = Object.keys(addressGBProvinceDistrict).map((key) => {
    return {
        label: `=============== ${key} ===============`,
        options: addressGBProvinceDistrict[key].map((a) => {
            return {
                label: a.detail,
                id: `${a.detail}}`
            };
        }),
    };
});

fs.writeFileSync("addresses.json", JSON.stringify(addressMap))
console.log("addressMap: ", addressMap.sort((a, b) => a.name < b.name))