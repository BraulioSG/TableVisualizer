import 'react'
import './FilterBox.scss'

//tools
import { useEffect, useState } from 'react';

interface filterBoxProps {
    filterUpdater?: Function
}

export default function (props: filterBoxProps): JSX.Element {
    const { filterUpdater } = props;
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
    const [sortCommerce, setSortCommerce] = useState<boolean | null>(null);
    const [sortCuit, setSortCuit] = useState<boolean | null>(null);

    const activeFilterHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let opt = evt.target.value;
        setActiveFilter(valueToBoolean(opt))
    }

    const sortComerceHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let opt = evt.target.value;
        setSortCommerce(valueToBoolean(opt))
    }

    const sortCuitHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let opt = evt.target.value;
        setSortCuit(valueToBoolean(opt))
    }

    const valueToBoolean = (val: string): boolean | null => {
        if (val === "2") return null;
        else return val === "1"
    }

    useEffect(() => {
        //change the query 500ms after the user stoped typing
        const timeout = setTimeout(() => {
            if (filterUpdater !== undefined) filterUpdater(activeFilter, sortCommerce, sortCuit);
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [activeFilter, sortCommerce, sortCuit])


    return (
        <div className='FilterBox'>
            <div className="FilterBox-active FilterBox-param">
                <p className='FilterBox-param-title'>Mostrar</p>
                <div className="FilterBox-subParam">
                    <p className='FilterBox-param-subtitle'>Estados</p>
                    <div className="FilterBox-options">
                        <div className="FilterBox-options-opt">
                            <label htmlFor="show-active-true"><input type="radio" name="show-active" id='show-active-true' value={1} onChange={activeFilterHandler} />Activos</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="show-active-false"><input type="radio" name="show-active" id='show-active-false' value={0} onChange={activeFilterHandler} />No Activos</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="show-active-null"><input type="radio" name="show-active" id='show-active-null' value={2} onChange={activeFilterHandler} />Ambos</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="FilterBox-active FilterBox-param">
                <p className='FilterBox-param-title'>Ordenar</p>
                <div className="FilterBox-subParam">
                    <p className='FilterBox-param-subtitle'>Comercio</p>
                    <div className="FilterBox-options">
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-commerce-true"><input type="radio" name="sort-commerce" id='sort-commerce-true' value={1} onChange={sortComerceHandler} />Ascendente</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-commerce-false"><input type="radio" name="sort-commerce" id='sort-commerce-false' value={0} onChange={sortComerceHandler} />Descendente</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-commerce-null"><input type="radio" name="sort-commerce" id='sort-commerce-null' value={2} onChange={sortComerceHandler} />Ninguno</label>
                        </div>
                    </div>
                </div>
                <div className="FilterBox-subParam">
                    <p className='FilterBox-param-subtitle'>CUIT</p>
                    <div className="FilterBox-options">
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-cuit-true"><input type="radio" name="sort-cuit" id='sort-cuit-true' value={1} onChange={sortCuitHandler} />Ascendente</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-cuit-false"><input type="radio" name="sort-cuit" id='sort-cuit-false' value={0} onChange={sortCuitHandler} />Descendente</label>
                        </div>
                        <div className="FilterBox-options-opt">
                            <label htmlFor="sort-cuit-null"><input type="radio" name="sort-cuit" id='sort-cuit-null' value={2} onChange={sortCuitHandler} />Ninguno</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="FilterBox-active FilterBox-param">

            </div>

        </div >
    )
}