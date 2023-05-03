import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

function Regist() {
    let formObj = {
        vnev: "",
        knev: "",
        email: "",
        password: "",
        passwordAgain: ""
    };
    const [formData, setFormData] = useState(formObj);

    const writeData = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password == formData.passwordAgain) {
            kuldes(formData, 'POST')
        } else {
            toast.error("Nem egyeznek meg a jelszók")
        }
    }

    const navigate = useNavigate();
    const kuldes = (formData, method) => {
        fetch('http://10.0.28.8:8000/api/webshop/user/register', {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(token => {
                if (!token.message) {
                    sessionStorage.setItem('usertoken', token);
                    toast.success("Sikeres regisztráció!", { position: toast.POSITION.BOTTOM_RIGHT })
                    navigate('/');
                } else {
                    toast.error(token.message, { position: toast.POSITION.BOTTOM_RIGHT });
                }

            })
            .catch(err => toast.error(err), { position: toast.POSITION.BOTTOM_RIGHT });
    }

    return (
        <div>
            <h2 className='text-center font-bold text-2xl my-10 text-fuchsia-400 drop-shadow-shadow'>Regisztráció</h2>
            <div className='flex justify-center items-center'>
                <div className='flex-column'>
                    <form onSubmit={onSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Vezeték Név:</span>
                            </label>
                            <input type="text" onChange={writeData} id="vnev" value={formData.vnev} required className="input input-bordered" />
                            <label className="label">
                                <span className="label-text text-lg">Keresztnév Név:</span>
                            </label>
                            <input type="text" onChange={writeData} id="knev" required value={formData.knev} className="input input-bordered" />
                            <label className="label">
                                <span className="label-text text-lg">Email:</span>
                            </label>
                            <input type="text" onChange={writeData} id="email" required value={formData.email} className="input input-bordered" />
                            <label className="label">
                                <span className="label-text text-lg">Jelszó:</span>
                            </label>
                            <input type="password" onChange={writeData} id="password" required value={formData.password} className="input input-bordered" />
                            <label className="label">
                                <span className="label-text text-lg">Jelszó megint:</span>
                            </label>
                            <input type="password" onChange={writeData} id="passwordAgain" required value={formData.passwordAgain} className="input input-bordered" />
                            <button type="submit" className='btn btn-primary mx-10 my-4'>Küldés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Regist