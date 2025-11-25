import axios from 'utils/axios';


export async function getListItemCodeImport(taxCode: string) {
    try {
        const response = await axios.get(`/api/import/list-item-code/${taxCode}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}

export async function getListItemCodeExport(taxCode: string) {
    try {
        const response = await axios.get(`/api/export/list-item-code/${taxCode}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}