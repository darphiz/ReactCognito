import folder_image from '../assets/img/folder.png';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {SERVER_URL} from '../index';
import toast from 'react-hot-toast';

interface IFolder{
    id: string;
    name: string;
    kind: string;
    mimeType: string;
}


export const Drive = () => {
    const navigate = useNavigate();
    const [folders, setFolders] = useState<Array<IFolder>>([]);
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        (
            async () => {
                try{
                const res = await fetch(`${SERVER_URL}/api/google/drive`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                
                const data = await res.json();
                
                if (data.status === 'ok') {
                    setFolders(data.files);
                    setFetching(false);
                } else {
                    setFetching(false);
                    navigate('/', {state: {redirect_message: data.message}, replace: true});
                }}
                catch{
                    setFetching(false);
                    navigate('/', {state: {redirect_message: 'Something went wrong'}, replace: true});
                }
            }
        )();

    }, [navigate]);
  

    const logout = ()=>{
        fetch(`${SERVER_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((res) => {
            if (res.statusText === "OK") {
                navigate('/', {state: {redirect_message: 'Logged out'}, replace: true});
            }
        })
        .catch(() => {
            toast.error('Something went wrong');
        });
    
    
    }

    return (
    <div className="min-h-screen font-Poppins text-cs-green p-6 bg-cs-bg">
        <div className="flex font-bold items-center justify-between">
            <h2 className="text-2xl font-Pacifico"><a href="/drive">Files.com</a></h2>
            <p className="text-xs text-red-500 cursor-pointer" onClick={()=>logout()}>Logout</p>
        </div>

        {fetching ? <p className="text-center text-xs mt-10">Fetching files...</p> :

            <div className="flex border flex-col p-5 space-y-4 rounded-md mt-10">
            {(folders.length > 1)  ?  folders.map((folder: IFolder) => (  
                <div key={folder.id} className="flex items-center space-x-2">
                    <img src={folder_image} alt="folder"  className='w-4 h-4' />
                    <p className="text-sm font-bold">{folder.name}</p>
                </div>
            ))
            : <p className="text-center mx-auto text-sm my-3 text-bold">No Folders/Files</p>
            
            }
            </div>
        }
    </div>
  )
}
