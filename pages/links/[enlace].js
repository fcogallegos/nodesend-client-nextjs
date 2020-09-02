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
            <h1>from [link].js</h1>
        </Layout>
    )
}