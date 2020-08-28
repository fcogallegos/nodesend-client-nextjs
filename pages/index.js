import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
import Link from 'next/link';

const Index = () => {

  //extract the authenticated user of the storage
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  useEffect(() => {
    authenticatedUser()
  }, []);

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
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
      </div>
    </Layout>
   );
}
 
export default Index;