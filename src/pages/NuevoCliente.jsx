import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/Clientes'

export async function action({request}) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

    // console.log(formData.get('nombre'))
    // console.log(datos)

    // Validación
    const errores = []
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push('El email no es válido')
    }
    
    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        // console.log(Object.keys(errores))
        return errores
    }

    await agregarCliente(datos)
    return redirect('/')

}

function NuevoCliente() {
    const errores = useActionData() // cuando usamos un action, usamos useActionData para pasar la inf. que retornemos del action a la variable errores en la función NuevoCliente()
    const navigate = useNavigate() // Para regresar a la página anterior (o a url específica)

    console.log(errores)
  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
        <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

        <div className="flex justify-end">
            <button
                className="bg-blue-800 text-white px-3 py-1 uppercase font-bold"
                onClick={() => navigate(-1)}
            >Volver</button>
        </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
            {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

            <Form
                method='POST'
                noValidate
            >
                <Formulario />

                <input 
                    type="submit" 
                    className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                    value="Registrar Cliente"
                />
            </Form>
        </div>
    </>
  )
}

export default NuevoCliente
