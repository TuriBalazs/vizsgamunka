import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import UserContext from './context/UserContext'

function Profile() {
    const user = useContext(UserContext);
    const token = sessionStorage.getItem('usertoken');
    let formObj = {
        email: "",
        phone: ""
    };
    const [formData, setFormData] = useState(formObj);

    const writeData = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.email == "") {
            formData.email = user.userdata.email;
        } else if (formData.phone == null) {
            formData.phone = user.userdata.phone;
        }
        kuldes(formData, 'POST');
    }

    const kuldes = (formData, method) => {
        fetch('http://10.0.20.7:8000/api/webshop/user/adatmodositas', {
            method: method,
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(token => {
                if (!token.message) {
                    toast.success("Sikeres adatmódosítás!", { position: toast.POSITION.BOTTOM_RIGHT })
                } else {
                    toast.error(token.message, { position: toast.POSITION.BOTTOM_RIGHT });
                }
            })
            .catch(err => toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT }));
    }

    return (
        <form onSubmit={onSubmit} className='mx-10 mt-5 grid grid-cols-2 gap-4 md:text-2xl sm:text-lg font-bold'>
            <div className='text-end'>
                <h1>Név: </h1>
                <h1 className='my-5'>Email cím: </h1>
                <h1>Telefonszám: </h1>
            </div>
            <div className='mb-5'>
                <h1>{user.userdata.vnev} {user.userdata.knev}</h1>
                <input className='my-5 w-40 block md:text-lg' type="string" id="email" defaultValue={user.userdata.email} onChange={writeData} />
                <input className='w-40 md:text-lg' type="tel" pattern='[0-9]{2}-[0-9]{2}-[0-9]{7}' id="phone" defaultValue={user.userdata.phone} placeholder="06-30-7825267" onChange={writeData} />
            </div>
            <div className='col-span-2 text-center'>
                <button type='submit' className='btn'>szerkesztés</button>
            </div>
        </form>
    )
}

export default Profile