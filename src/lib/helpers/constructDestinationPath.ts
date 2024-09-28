export function constructDestinationPath(data: { countryName?: string | null, stateName?: string | null, cityName?: string | null }): string {
    if (!data.countryName) {
        return '';
    }

    let path = `${data.countryName}`;

    if (data.stateName) {
        path += `/${data.stateName}`;
    } else {
        return path;
    }

    if (data.cityName) {
        path += `/${data.cityName}`;
    }

    return path;
}
