import React from 'react'

function TipusokList({tipus}) {
    return (
        <div>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id={tipus.nev} type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label for={tipus.nev} class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tipus.nev}</label>
                </div>
            </li>
        </div>
    )
}

export default TipusokList