import { useState, useEffect } from 'react'
import TermekekList from './TermekekList';
import FilterList from './FilterList';
import 'alpinejs';

var page = 1;

function Termekek() {
    const [tipusok, setTipusok] = useState([]);
    const [markak, setMarkak] = useState([]);
    const [termekek, setTermekek] = useState([]);

    useEffect(() => {
        fetch('http://26.133.54.94:8000/api/webshop/tipusok')
            .then(res => res.json())
            .then(tipus => setTipusok(tipus))
            .catch(err => console.log(err));
        fetch('http://26.133.54.94:8000/api/webshop/markak')
            .then(res => res.json())
            .then(marka => setMarkak(marka))
            .catch(err => console.log(err));
        fetch(`http://26.133.54.94:8000/api/webshop/termekek/${page}`)
            .then(res => res.json())
            .then(termek => setTermekek(termek))
            .catch(err => console.log(err));
    }, [1]);

    const keres = (filter) => {
        if (filter.value == "tipus") {
            fetch(`http://26.133.54.94:8000/api/webshop/termekek/bytipus/${filter.id}`)
                .then(res => res.json())
                .then(termek => setTermekek(termek))
                .catch(err => console.log(err));
        } else {
            fetch(`http://26.133.54.94:8000/api/webshop/termekek/bymarka/${filter.id}`)
                .then(res => res.json())
                .then(termek => setTermekek(termek))
                .catch(err => console.log(err));
        }
    }

    const Termekek = () => {
        fetch(`http://26.133.54.94:8000/api/webshop/termekek/${page}`)
            .then(res => res.json())
            .then(termek => setTermekek(termek))
            .catch(err => console.log(err));
    }

    const pageUp = () => {
        if (page < 3) {
            page++;
            setTermekek([]);
            Termekek();
            window.scrollTo(0, 0);
        }
    }

    const pageDown = () => {
        if (page > 1) {
            page--;
            setTermekek([]);
            Termekek();
            window.scrollTo(0, 0);
        }
    }

    return (
        <form onChange={(e) => keres(e.target)} className='mx-10 grid md:grid-cols-12 gap-4'>
            <div className='col-span-2'>
                <div className='hidden md:grid'>
                    <h1 className='text-2xl font-bold text-fuchsia-400 drop-shadow-shadow'>Szűrő</h1>
                    <ul class="w-32 text-sm font-small text-center text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className='mt-2'>
                            <div className='dropdown'>
                                <label tabIndex={0}>Típusok</label>
                                <ul tabIndex={0} className='menu menu-compact dropdown-content p-3 shadow bg-white rounded-box'>
                                    {
                                        tipusok.map((filter, index) => (<FilterList tipus={filter} />))
                                    }
                                </ul>
                            </div>
                        </li>
                        <li className='my-2'>
                            <div className='dropdown'>
                                <label tabIndex={1}>Márka</label>
                                <ul tabIndex={1} className='menu menu-compact dropdown-content p-3 shadow bg-white rounded-box'>
                                    {
                                        markak.map((filter, index) => (<FilterList tipus={filter} />))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='md:hidden'>
                    <div x-data="{ show: false, menu1: false, menu2: false }">
                        <button type='button' className="text-sm text-white bg-blue-800 px-4 py-2 border-0 rounded-md outline-none hover:bg-blue-900"
                            x-on:click="show = ! show">Szűrő</button>
                        <div className="relative">
                            <div className="bg-white rounded-md w-full p-3 top-1 absolute z-10" x-show="show"
                                x-cloak x-transition:enter="transition ease-out duration-100"
                                x-transition:enter-start="transform opacity-0 scale-95">
                                <ul
                                    className="[&>li]:text-sm [&>li]:cursor-pointer [&>li]:px-2 [&>li]:py-1 [&>li]:rounded-md [&>li]:transition-all hover:[&>li]:bg-gray-600 active:[&>li]:bg-gray-700 active:[&>li]:scale-[0.99]">
                                    <li className="flex items-center justify-between"
                                        x-on:click="menu1 = !menu1; menu2 = false"
                                    >
                                        Típus
                                    </li>
                                    <div className="bg-white rounded-md p-3 absolute -right-[133px] [&>li]:text-white [&>li]:text-sm [&>li]:cursor-pointer [&>li]:px-2 [&>li]:py-1 [&>li]:rounded-md [&>li]:transition-all hover:[&>li]:bg-gray-600 active:[&>li]:bg-gray-700 active:[&>li]:scale-[0.99]"
                                        x-show="menu1" x-transition:enter="transition ease-out duration-100"
                                        x-transition:enter-start="transform opacity-0 scale-95">
                                        {
                                            tipusok.map((filter, index) => (<FilterList tipus={filter} />))
                                        }
                                    </div>
                                </ul>
                                <ul
                                    className="[&>li]:text-sm [&>li]:cursor-pointer [&>li]:px-2 [&>li]:py-1 [&>li]:rounded-md [&>li]:transition-all hover:[&>li]:bg-gray-600 active:[&>li]:bg-gray-700 active:[&>li]:scale-[0.99]">
                                    <li className="flex items-center justify-between"
                                        x-on:click="menu2 = !menu2; menu1 = false"
                                    >
                                        Márka
                                    </li>
                                    <div className="bg-white rounded-md p-3 absolute -right-[155px] [&>li]:text-white [&>li]:text-sm [&>li]:cursor-pointer [&>li]:px-2 [&>li]:py-1 [&>li]:rounded-md [&>li]:transition-all hover:[&>li]:bg-gray-600 active:[&>li]:bg-gray-700 active:[&>li]:scale-[0.99]"
                                        x-show="menu2" x-transition:enter="transition ease-out duration-100"
                                        x-transition:enter-start="transform opacity-0 scale-95">
                                        {
                                            markak.map((filter, index) => (<FilterList tipus={filter} />))
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='col-span-8'>
                <h1 className='text-2xl font-bold text-fuchsia-400 drop-shadow-shadow'>Termékek</h1>
                <ul class="w-32 text-sm font-small text-gray-900 rounded-lg dark:border-gray-600 dark:text-white">
                    {
                        termekek.map((termek, index) => (<TermekekList termek={termek} />))
                    }
                </ul>
                <div className='text-center'>
                    <button type='button' className='btn' onClick={() => pageDown()}>«</button>
                    <button type='button' className='btn mx-1'>{page}</button>
                    <button type='button' className='btn' onClick={() => pageUp()}>»</button>
                </div>
            </div>
            <div className='col-span-2'>
                <h1 className='text-2xl font-bold text-fuchsia-400 drop-shadow-shadow'>reklám</h1>
                <div>
                    <p>aaa</p>
                </div>
            </div>
        </form >
    )
}

export default Termekek