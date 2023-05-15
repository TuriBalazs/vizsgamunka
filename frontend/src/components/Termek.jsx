import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Termek({ termek }) {
  const valami = useLocation();
  const termekinfo = valami.state;
  const [kepek, setKepek] = useState([]);
  const [spec, setSpec] = useState([]);

  useEffect(() => {
    fetch(`http://26.133.54.94:8000/api/webshop/kepek/termek/${termekinfo.termek._id}`)
      .then(res => res.json())
      .then(kep => setKepek(kep))
      .catch(err => console.log(err));
  }, [1])

  const change = (number) => {
    const large = document.getElementById("large")
    large.src = "http://26.133.54.94:8000" + kepek.path + "large/" + kepek.images[number].eredeti
  }

  return (
    kepek.length != 0 ?
      <div className="p-10">
        <div className="w-full lg:max-w-full lg:flex">
          <div className="grid grid-cols-1 items-center">
            <img onClick={() => change(0)} className="w-10 h-10 rounded-full mr-4" src={"http://26.133.54.94:8000" + kepek.path + "mini/" + kepek.images[0].belyeg} alt="Avatar of Writer" />
            <img onClick={() => change(1)} className="w-10 h-10 rounded-full mr-4" src={"http://26.133.54.94:8000" + kepek.path + "mini/" + kepek.images[1].belyeg} alt="Avatar of Writer" />
            <img onClick={() => change(2)} className="w-10 h-10 rounded-full mr-4" src={"http://26.133.54.94:8000" + kepek.path + "mini/" + kepek.images[2].belyeg} alt="Avatar of Writer" />
            <img onClick={() => change(3)} className="w-10 h-10 rounded-full mr-4" src={"http://26.133.54.94:8000" + kepek.path + "mini/" + kepek.images[3].belyeg} alt="Avatar of Writer" />
            <img onClick={() => change(4)} className="w-10 h-10 rounded-full mr-4" src={"http://26.133.54.94:8000" + kepek.path + "mini/" + kepek.images[4].belyeg} alt="Avatar of Writer" />
          </div>
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
            <img id='large' className='w-48 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400' src={"http://26.133.54.94:8000" + kepek.path + "large/" + kepek.images[0].eredeti} />
          </div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{termekinfo.termek.nev}</div>
              <p className="text-gray-700 text-base">{termekinfo.termek.specifikaciok}</p>
              <p className="text-gray-700 text-base">{termekinfo.termek.garancia} Év garancia</p>
              <p className="text-gray-700 text-base">{termekinfo.termek.ar} Ft</p>
              <button type='button' className='btn'>kosárba tesz</button>
            </div>
          </div>
        </div>
      </div>
      : <></>
  )
}

export default Termek