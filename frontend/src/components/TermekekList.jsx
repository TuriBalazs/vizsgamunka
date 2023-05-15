import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TermekekList({ termek }) {
    const [kepek, setKepek] = useState([]);
    useEffect(() => {
        fetch(`http://26.133.54.94:8000/api/webshop/kepek/${termek._id}`)
            .then(res => res.json())
            .then(kep => setKepek(kep))
            .catch(err => console.log(err));
    }, [1])
    return (
        <div class="card card-side my-2 bg-base-100 shadow-xl lg:w-verybig lg:ml-0 md:w-big md:ml-16 xs:w-smol">
            <figure><img className='w-48' src={"http://26.133.54.94:8000" + kepek.path + kepek.images} /></figure>
            <div class="card-body">
                <h2 class="card-title hover:text-navcolor"><Link to='/termek' state={{termek:termek}}>{termek.nev}</Link></h2>
                <p className='w-80'>{termek.leiras}</p>
            </div>
        </div>
    )
}

export default TermekekList