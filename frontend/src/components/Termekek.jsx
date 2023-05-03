import { useState, useEffect } from 'react'
import TermekekList from './TermekekList';
import FilterList from './FilterList';

function Termekek() {
    const [tipusok, setTipusok] = useState([]);
    const [markak, setMarkak] = useState([]);
    const [termekek, setTermekek] = useState([]);

    useEffect(() => {
        fetch('http://10.0.28.8:8000/api/webshop/tipusok')
            .then(res => res.json())
            .then(tipus => setTipusok(tipus))
            .catch(err => console.log(err));
        fetch('http://10.0.28.8:8000/api/webshop/markak')
            .then(res => res.json())
            .then(marka => setMarkak(marka))
            .catch(err => console.log(err));
        fetch(`http://10.0.28.8:8000/api/webshop/termekek/`)
            .then(res => res.json())
            .then(termek => setTermekek(termek))
            .catch(err => console.log(err));
    }, [1]);

    const keres = (tipus) => {
        fetch(`http://10.0.28.8:8000/api/webshop/termekek/bytipus/${tipus}`)
            .then(res => res.json())
            .then(termek => setTermekek(termek))
            .catch(err => console.log(err));
    }

    return (
        <form onChange={(e) => keres(e.target.id)} className='mx-10 grid md:grid-cols-12 gap-4'>
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
                <div className=''>
                    <button id="multiLevelDropdownButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown<svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button>
                                <div id="doubleDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Overview</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My downloads</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Billing</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rewards</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-span-8'>
                <h1 className='text-2xl font-bold text-fuchsia-400 drop-shadow-shadow'>Termékek</h1>
                <ul class="w-32 text-sm font-small text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {
                        termekek.map((termek, index) => (<TermekekList termek={termek} />))
                    }
                </ul>
            </div>
            <div className='col-span-2'>
                <h1 className='text-2xl font-bold text-fuchsia-400 drop-shadow-shadow'>reklám</h1>
                <div>
                    <p>aaa</p>
                </div>
            </div>
        </form>
    )
}

export default Termekek