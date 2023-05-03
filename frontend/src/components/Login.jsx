import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import {toast} from 'react-toastify';

function Login() {
    let formObj = {
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState(formObj);

    const writeData = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        kuldes(formData,'POST')
    }

    const navigate = useNavigate();
    const { update } = useContext(UserContext);
    const kuldes = (formData, method) => {
        fetch('http://10.0.20.7:8000/api/webshop/user/login', {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(token => {
                if (!token.message) {
                    sessionStorage.setItem('usertoken', token);
                    toast.success("Sikeres belépés!", { position: toast.POSITION.BOTTOM_RIGHT })
                    update();
                    navigate('/');
                } else {
                    toast.error(token.message, { position: toast.POSITION.BOTTOM_RIGHT });
                }
            })
            .catch(err => toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT }));
    }

    return (
        <div>
            <h2 className='text-center font-bold text-2xl my-10 text-fuchsia-400 drop-shadow-shadow'>Belépés</h2>
            <div className='flex justify-center items-center'>
                <div className='flex-column'>
                    <form onSubmit={onSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Email cím:</span>
                            </label>
                            <input type="text" onChange={writeData} id="email" value={formData.email} required className="input input-bordered" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Jelszó:</span>
                            </label>
                            <input type="password" onChange={writeData} id="password" value={formData.password} required className="input input-bordered" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <button type="submit" className='btn btn-primary mx-10 my-4'>Küldés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login