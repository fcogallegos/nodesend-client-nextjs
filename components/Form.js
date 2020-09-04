import React, { useState } from 'react';

const Form = () => {

    const [ hasPassword, setHasPassword ] = useState(false);

    return ( 
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Delete:</label>
                <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
                    <option value="" selected disabled>-- Select --</option>
                    <option value="1">One Download</option>
                    <option value="5">Five Downloads</option>
                    <option value="10">Ten Downloads</option>
                    <option value="20">Twenty Downloads</option>
                </select>
            </div>
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Password Protect</label>
                    <input 
                        type="checkbox" 
                        onChange={() => setHasPassword(!hasPassword) }
                    />
                    
                </div>
                { hasPassword ? (
                    <input 
                        type="password" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
                    />
                ) : null }
                
            </div>
        </div>
     );
}
 
export default Form;