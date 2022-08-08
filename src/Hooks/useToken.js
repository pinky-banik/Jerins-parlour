import { useEffect, useState } from 'react';
 
const useToken = user => {
    const[token,setToken] = useState('');
   
    useEffect(()=>{
        const name = user?.user?.displayName;
        const email = user?.user?.email;
        const img = user?.user?.photoURL;
       
        const currentUser ={
            name : name,
            email:email,
            img : img,
        };
        if(email){
            fetch(`https://mighty-garden-92013.herokuapp.com/user/${email}`,{
                method : 'PUT',
                headers:{
                    'content-type' :'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('data inside useToken',data);
            //     const accessToken = data.token;
            //     localStorage.setItem('accessToken',accessToken);
                setToken(user);
            //
        })
        }
    },[user]);
    return [token];
};
export default useToken;