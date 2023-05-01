import 'react'
import './StoreTable.scss'

//components
import Store from '../../store/Store'

interface storeTableParams {
    data: Store[]
}

export default function StoreTable({ data }: storeTableParams): JSX.Element {

    return (
        <div className="StoreTable">
            <table className="StoreTable-table">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Comercio</th>
                        <th>CUIT</th>
                        <th>Concept1</th>
                        <th>Concept2</th>
                        <th>Concept3</th>
                        <th>Concept4</th>
                        <th>Concept5</th>
                        <th>Concept6</th>
                        <th>Balance</th>
                        <th>Activo</th>
                        <th>Ultima Venta</th>
                    </tr>
                    {data.map((store: Store) => {
                        return (
                            <tr key={store.id}>
                                <td>{store.id}</td>
                                <td>{store.commerce}</td>
                                <td>{store.cuit}</td>
                                <td>{store.concepts[0] ?? "N/A"}</td>
                                <td>{store.concepts[1] ?? "N/A"}</td>
                                <td>{store.concepts[2] ?? "N/A"}</td>
                                <td>{store.concepts[3] ?? "N/A"}</td>
                                <td>{store.concepts[4] ?? "N/A"}</td>
                                <td>{store.concepts[5] ?? "N/A"}</td>
                                <td>{store.balance}</td>
                                <td>{store.active ? "Sí" : "No"}</td>
                                <td>{store.lastSale.toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}