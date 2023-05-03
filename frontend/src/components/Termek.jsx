import { useState } from 'react'
import {toast} from 'react-toastify'

function Termek() {
    const [spec, setSpec] = useState([]);
    const [miniImages, setMiniImages] = useState([]);
    const [largeImages, setLargeImages] = useState([]);
    const [nev,setNev]=useState("");
    const [leiras,setLeiras]=useState("");
    const [garancia,setGarancia]=useState("");
    const [ar,setAr]=useState("");
    const [akcio,setAkcio]=useState("");
    const [marka,setMarka]=useState("");
    const [tipus,setTipus]=useState("");
    
    const specChange =(e)=>{
        setSpec([...spec, ...e.target.files]);
    }

    const miniImageChange = (e) => {
        setMiniImages([...miniImages, ...e.target.files]);
    }

    const largeImageChange = (e) => {
        setLargeImages([...largeImages, ...e.target.files]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData =new FormData();
        formData.append("nev",nev)
        formData.append("leiras",leiras)
        formData.append("garancia",garancia)
        formData.append("ar",ar)
        formData.append("akcio",akcio)
        formData.append("marka",marka)
        formData.append("tipus",tipus)
        
        for(let i=0;i<spec.length;i++){
            formData.append("specs",spec[i])
        }
        for(let i=0;i<miniImages.length;i++){
            formData.append("mini"+i,miniImages[i])
        }
        for(let i=0;i<largeImages.length;i++){
            formData.append("large"+i,largeImages[i])
        }
        kuldes(formData, 'POST');
    }

    const kuldes = (data, method) => {
        fetch('http://10.0.28.8:8000/api/webshop/termekek/felvesz', {
            method: method,
            body: data
        })
            .then(res => res.json())
            .then(valasz=>toast.success(valasz.message,{position: toast.POSITION.BOTTOM_RIGHT}))
            .catch(err => toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT }));
    }

    return (
        <form onSubmit={onSubmit} className='mx-10 mt-5 grid grid-cols-2 gap-4 md:text-2xl sm:text-lg font-bold'>
            <div className='text-end'>
                <h1>Név: </h1>
                <h1 className='mt-3'>Leírás: </h1>
                <h1 className='mt-4'>Garancia: </h1>
                <h1 className='mt-4'>Ár: </h1>
                <h1 className='mt-4'>Akciós: </h1>
                <h1 className='mt-4'>Márka: </h1>
                <h1 className='mt-5'>Típus: </h1>
            </div>
            <div className='mb-5'>
                <input className='w-40 block md:text-lg' type="string" id="nev" onChange={(e)=>setNev(e.target.value)} value={nev} />
                <input className='mt-5 w-40 block md:text-lg' type="string" id="leiras" onChange={(e)=>setLeiras(e.target.value)} value={leiras} />
                <input className='mt-5 w-40 block md:text-lg' type="string" id="garancia" onChange={(e)=>setGarancia(e.target.value)} value={garancia} />
                <input className='mt-5 w-40 block md:text-lg' type="number" id="ar" onChange={(e)=>setAr(e.target.value)} value={ar} />
                <input className='mt-5 w-40 block md:text-lg' type="string" id="akcio" placeholder='alapértelmezetten nincs' onChange={(e)=>setAkcio(e.target.value)} value={akcio} />
                <input className='my-5 w-40 block md:text-lg' type="string" id="marka" onChange={(e)=>setMarka(e.target.value)} value={marka} />
                <input className='w-40 md:text-lg' type="string" id="tipus" onChange={(e)=>setTipus(e.target.value)} value={tipus} />
            </div>
            <div className='col-span-2 text-center'>
                <input type="file" id='specs' onChange={specChange} className="file-input file-input-bordered w-full max-w-xs" required />
            </div>
            <div className='col-span-2 text-center'>
                <input type="file" id='mini' onChange={miniImageChange} className="file-input file-input-bordered w-full max-w-xs" multiple required />
            </div>
            <div className='col-span-2 text-center'>
                <input type="file" id='large' onChange={largeImageChange} className="file-input file-input-bordered w-full max-w-xs" multiple required />
            </div>
            <div className='col-span-2 text-center'>
                <button type='submit' className='btn'>felvétel</button>
            </div>
        </form>
    )
}

export default Termek