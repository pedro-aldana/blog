import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {registerUser} from '../../redux/actions/register/register'



function FormRegister() {

  const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
    })
    
    const dispatch = useDispatch()
    const {loading,error,email} = useSelector((state) => state.Registro);

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamamos a la acción de registro con los datos del formulario
        dispatch(registerUser(formData));
    }



    return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registre su Cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2">
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Repita Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                    type="password"
                    name="re_password"
                    value={formData.re_password}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <button type="submit" disabled={loading} className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                        {loading ? 'Loading...' : 'Register'}
                </button>
            </div>
            {error && <div>Error: {error}</div>}
            {email && <div>User registered: {email}</div>}
          </form>

        </div>
      </div>
    </>
  )
}

export default FormRegister
