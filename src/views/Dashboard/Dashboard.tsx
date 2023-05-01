import 'react'
import './Dashboard.scss'

//tools
import { useState, useEffect } from 'react';
import { sendRequest, requestParameters } from '../../api/api'
import Store from '../../store/Store';

//components
import Searchbar from '../../components/Searchbar/Searchbar'
import StoreTable from '../../components/StoreTable/StoreTable'
import FilterBox from '../../components/FilterBox/FilterBox';



const defaultRequest: requestParameters = {
    query: "",
    active: null,
    sortComerce: null,
    sortCuit: null,
}


export default function Dashboard(): JSX.Element {
    const [data, setData] = useState<Store[]>([]);
    const [request, setRquest] = useState<requestParameters>(defaultRequest);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [maxPages, setMaxPages] = useState<number>(1);
    const [startIdx, setStartIdx] = useState(0);
    const consultApi = () => {
        sendRequest(request)
            .then(
                res => {
                    setData(res);
                    setMaxPages(Math.ceil(res.length / itemsPerPage))
                    setPage(1)
                }
            );
    }

    useEffect(() => {
        consultApi();
    }, [request])


    const setQuery = ((value: string) => {
        setRquest({ ...request, query: value })
        setPage(1)
    });

    const setFilters = ((active: boolean | null, sortComerce: boolean | null, sortCuit: boolean | null) => {
        setRquest({ ...request, active, sortComerce, sortCuit })
        setPage(1)
    })

    const nextPage = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (page + 1 > maxPages) return;
        setPage(page + 1);
        setStartIdx(itemsPerPage * page);
    }

    const prevPage = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (page - 1 <= 0) return
        setPage(page - 1);
        setStartIdx(itemsPerPage * (page - 2));
    }

    const handleSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        evt.preventDefault();
        setItemsPerPage(parseInt(evt.target.value));
        setMaxPages(Math.ceil(data.length / parseInt(evt.target.value)))
    }



    return (
        <div className='Dashboard'>
            <div className="Dashboard-topbar">
                <Searchbar action={setQuery} />
            </div>

            <div className="Dashboard-content">
                <div className="Dashboard-content-col">
                    <FilterBox filterUpdater={setFilters} />
                </div>
                <div className="Dashboard-pages">
                    <div className="setItems">
                        <label htmlFor="itemsPerPage">
                            show
                            <select name="items per page" id="itemsPerPage" onChange={handleSelect}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            items per page
                        </label>
                    </div>
                    <div className="navButtons">
                        <button className='navButton' onClick={prevPage}><i className="material-icons">chevron_left</i></button>
                        <span>page <br /> {page} / {maxPages}</span>
                        <button className='navButton' onClick={nextPage}><i className="material-icons">chevron_right</i></button>
                    </div>
                </div>
                <div className="Dashboard-content-col">
                    <StoreTable data={data.slice(startIdx, startIdx + itemsPerPage)} />
                </div>
            </div>
            <p>total {data.length} items</p>
        </div>
    )
}