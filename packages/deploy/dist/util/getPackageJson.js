import fs from "fs";
export const getPackageJson = () => {
    const jsonFile = fs.readFileSync("package.json", "utf8");
    const jsonData = JSON.parse(jsonFile);
    return jsonData;
};
