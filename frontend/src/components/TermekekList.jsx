import { useEffect, useState } from 'react'

function TermekekList({ termek }) {
    const [kepek, setKepek] = useState([]);
    useEffect(() => {
        fetch(`http://10.0.28.8:8000/api/webshop/kepek/${termek._id}`)
            .then(res => res.json())
            .then(kep => setKepek(kep))
            .catch(err => console.log(err));
    }, [1])
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl lg:w-verybig lg:ml-0 md:w-big md:ml-16 xs:w-smol">
                <figure><img src={"http://10.0.28.8:8000" + kepek.path + kepek.images} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{termek.nev}</h2>
                    <p>{termek.leiras}</p>
                    <p className='font-bold'>{termek.ar} Ft</p>
                </div>
            </div>
        </div>
    )
}

export default TermekekList