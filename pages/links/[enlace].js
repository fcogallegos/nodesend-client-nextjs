import Layout from '../../components/Layout';
import clientAxios from '../../config/axios';


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
    console.log(enlace);
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Download your file</h1>
            <div className="flex items-center justify-center mt-10">
                <a 
                    href={`${process.env.backendURL}/api/files/${enlace.file}`} 
                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                    download
                >Here</a>
            </div>
        </Layout>
    )
}