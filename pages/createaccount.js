import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alert from '../components/Alert';

const CreateAccount = () => {

    //access to state
    const AuthContext = useContext(authContext);
    const { message, registerUser } = AuthContext;


    //form and validation witb formik and yup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The Name is required'),
            email: Yup.string('The Email is not valid').required('The Email is required'),
            password: Yup.string().required('The Password is required').min(6, 'The password must be at least 6 characters')
        }),
        onSubmit: values => {
            registerUser(values);
        }
    });


  return ( 
    <Layout>
        <div className="max-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Create Account</h2>

            { message && <Alert /> }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label 
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="name"
                            >Name</label>
                            <input 
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                placeholder="Username"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>    
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="email"
                            >Email</label>
                            <input 
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="User Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>    
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="password"
                            >Password</label>
                            <input 
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="User Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>    
                            ) : null }
                        </div>

                        <input 
                            type="submit"
                            style={{cursor: `pointer`}}
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                            value="Create Account"
                        />

                    </form>
                </div>
            </div>
        </div>
    </Layout>
   );
}
 
export default CreateAccount;