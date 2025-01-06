export function constructDestinationPath(data: { countryParam?: string | null, stateParam?: string | null, cityParam?: string | null }): string {
    if (!data.countryParam) {
        return '';
    }

    let path = `${data.countryParam}`;

    if (data.stateParam) {
        path += `/${data.stateParam}`;
    } else {
        return path;
    }

    if (data.cityParam) {
        path += `/${data.cityParam}`;
    }

    return path;
}
