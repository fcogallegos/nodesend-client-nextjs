import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {

    // using the hook useRouter
    const router = useRouter();

    //extract the authenticated user of the storage
    const AuthContext = useContext(authContext);
    const { authenticatedUser, user, signOff } = AuthContext;

    // Context of the application
    const AppContext = useContext(appContext);
    const { cleanState } = AppContext;

    useEffect(() => {
      authenticatedUser()
    }, []);

    const redirect = () => {
        router.push('/');
        cleanState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img 
                    onClick={() => redirect()} 
                    className="w-64 mb-8 md:mb-0" style={{ cursor: `pointer` }} 
                    src="/logo.svg" 
                />
            </Link>
            

            <div>
                {
                    user ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hello {user.name}!</p>
                            <button 
                                type="button" 
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={() => signOff()}
                            >Sign Off</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Log in</a>
                            </Link>
                            <Link href="/createaccount">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Create Account</a>
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
     );
}
 
export default Header;