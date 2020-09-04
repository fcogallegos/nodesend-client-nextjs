import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';

const Index = () => {

  //extract the authenticated user of the storage
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  //extract the error message of files
  const AppContext = useContext(appContext);
  const { message_file, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('rns-token');
    if(token) {
      authenticatedUser()
    }
  }, []);

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      { url ? (
        <>
          <p className="text-center text-2xl mt-10">
            <span className="font-bold text-red-700 text-4xl uppercase">Your URL is: </span> {`${process.env.frontendURL}/links/${url}`}
          </p>
          <button 
            type="button"
            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
            onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
          >Copy Link</button>
        </>  
        ) : (
        <>  
          {message_file && <Alert />}
        
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone />

            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share files easily and privately</h2>
              <p className="text-lg leading-loose" style={{textAlign: `justify`}}>
                <span className="text-red-500 font-bold">ReactNodeSend</span> Firefox Send es un servicio web gratuito y de código abierto para compartir archivos cifrados de extremo a extremo desarrollado por Mozilla.
              </p>
              <Link href="/createaccount">
                <a className="text-red-500 font-bold text-lg hover:text-red-700">Create an account for greater benefits</a>
              </Link>
            </div>
          </div>
        </>
        )}
      </div>
    </Layout>
   );
}
 
export default Index;