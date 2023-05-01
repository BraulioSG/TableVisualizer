import Store from '../store/Store';
import data from './data';

const API_URL = 'https://api.koibanx.com/stores';

export interface requestParameters {
    query: string;
    active: boolean | null; // if null then it'll show both active and non-active
    sortComerce: boolean | null; //true: ascending, false: descending, null: none
    sortCuit: boolean | null; //true: ascending, false: descending, null: none
}

/**
 * Send a request to the api and parse the response to the
 * @returns the data in form of Store[] and the current page, the total amount of pages,
 * the total elements
 */
export async function sendRequest(req: requestParameters) {
    let url = `${API_URL}?`;

    let query = [];
    let sorting = {};

    let response: Store[] = data;

    if (req.query.trim() !== '') {
        query.push({
            $or: [
                { Commercio: { $regex: req.query } },
                { CUIT: { $regex: req.query } },
                { ID: { $regex: req.query } },
            ],
        });

        //mocking the response
        response = filterByQuery(req.query);
    }

    if (req.active != null) {
        if (req.active) query.push({ activo: 1 });
        else query.push({ activo: 0 });
        response = response.filter(store => store.active === req.active);
    }

    if (req.sortComerce !== null) {
        sorting = { ...sorting, Comercio: req.sortComerce ? 1 : -1 };
    }

    if (req.sortCuit !== null) {
        sorting = { ...sorting, CUIT: req.sortCuit ? 1 : -1 };
    }

    //mocking sorting
    response = sortData(response, req.sortComerce, req.sortCuit);

    if (query.length > 0) {
        url += 'q=';
        if (query.length == 1) {
            url += JSON.stringify(query[0]);
        } else {
            url += JSON.stringify({ $and: [query[0], query[1]] });
        }
    }

    if (Object.keys(sorting).length > 0) {
        url += '&h=' + JSON.stringify({ $orderBy: sorting });
    }

    console.log(url);
    return response;
}

function filterByQuery(query: string) {
    query = query.toLowerCase();
    return data.filter(store => {
        if (store.cuit.toLowerCase().includes(query)) return true;
        if (store.commerce.toLowerCase().includes(query)) return true;
        return store.id.toLowerCase().includes(query);
    });
}

function sortData(
    data: Store[],
    byCommerce: boolean | null,
    byCuit: boolean | null
) {
    if (byCommerce === null && byCuit == null) return data;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
            let temp = data[j];
            let commerceSwitch: boolean;
            if (byCommerce !== null)
                commerceSwitch =
                    (data[j].commerce < data[j + 1].commerce && byCommerce) ||
                    (data[j].commerce > data[j + 1].commerce && !byCommerce);
            else commerceSwitch = false;

            let cuitSwitch: boolean;
            if (byCuit !== null)
                cuitSwitch =
                    (data[j].cuit < data[j + 1].cuit && byCommerce) ||
                    (data[j].cuit > data[j + 1].cuit && !byCommerce);
            else cuitSwitch = false;

            if (commerceSwitch || cuitSwitch) {
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }

    return data;
}
