import Layout from '../../components/Layout';
import clientAxios from '../../config/axios';
import React, { useState } from 'react'


export async function getServerSideProps({params}) {
    
    const { enlace } = params;
    //console.log(enlace);

    const result = await clientAxios.get(`/api/links/${enlace}`);

    //console.log(result);

    return {
        props: {
            enlace: result.data
        }
    }
}

export async function getServerSidePaths() {
        
    const links = await clientAxios.get('/api/links');

    return {
        paths: links.data.links.map( link => ( {
            params: { enlace: link.url }
        })),
        fallback: false
    }
}

export default ({enlace}) => {

    const [ hasPassword, setHasPassword ] = useState(enlace.password);

    console.log(hasPassword);

    //console.log(enlace);

    const verifyPassword = e => {
        e.preventDefault();
        
        console.log('Verifying...');
    }
    return (
        <Layout>
            { 
                hasPassword ? (
                <>
                   <p className="text-center">This link is protected with a password, put it to continue...</p>
                   <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={ e => verifyPassword(e) }
                            >
                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password</label>
                                    <input 
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="Link Password"
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    style={{cursor: `pointer`}}
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    value="Validate Password"
                                />
                            </form>
                        </div>
                    </div>   
                </>
                ) : (
                <>    
                    <h1 className="text-4xl text-center text-gray-700">Download your file</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a 
                            href={`${process.env.backendURL}/api/files/${enlace.file}`} 
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            download
                        >Here</a>
                    </div>
                </>
                )
            }
            
        </Layout>
    )
}