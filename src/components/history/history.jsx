import { useEffect, useState } from "react";
import axios from "axios";

const History = props => {


    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(props.history)
    }, [history, props.history])

    const onClick = (city) => {
        axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${city}%2024b&key=AIzaSyAnbAD_1D0e6jNmFTA6P8kBAA2zs4TOlx0`)
            .then(res => {
                props.onClickChange(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng);
            })
    }

    console.log(history)

    return (
        <div className="history">
            <h4>История поиска:</h4>
            {
                history.map(h => <h1 onClick={() => onClick(h)} >{h}</h1>)
            }
        </div>
    )

}

export default History;