//importing useState Hook from React Library
import {useState} from 'react';

export default function NameVetterFrontend(){
    const [name, setName] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //aws api gateway invoking url
    const API_GATEWAY_URL = '';

    const vetName = async(e) => {
        e.preventDefault();

        const cleanName = name.trim();
        //removes sneaky spaces at the beginning/end
        if(!cleanName){

        }//if(!cleanName)

    } //const vetName

} //export default function NameVetterFrontend()