"use client";

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client/debug';
import spinner from './spinner.svg';
import Image from 'next/image';

const socket = io('https://labsnippets.onrender.com:3001');


const SnippetsDisplay = () => {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handleNewSnippets = async () => {
        // setsnippets((prev: any) => [...prev, snippet]);
        // token = true;
        // console.log("reloading ");
        try {
            const response = await fetch('/api/snippets', {
                method: 'GET',
            });
            const newSnippets = await response.json();

            console.log("new snippets : ", newSnippets);
            setSnippets(newSnippets.data);
            setLoading(false);
            // token = true;
        } catch (err) {
            console.log("error : ", err);
            alert('Failed to get snippets');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
            handleNewSnippets();
    }, []);

    console.log('snippets : ', snippets);

    // const snippets = useRecoilValue(snippetsState);

    return (
        <main className='mb-10 w-full bg-[#1b1b1b] h-[500px] '>
            <h1 className="p-2 text-lg ml-2">Snippets : </h1>
            {socket.connected && (
                <h1 className='text-blue-300 text-center py-2  sm:text-[1.2rem]'>You are connected with Id : {socket.id}</h1>
            )}

            {loading && <Image src={spinner} className="mx-auto" height={100} width={100} alt="loading..." />}
            <div className={`max-h-full  text-black flex-1 border 
              rounded-md shadow-2xl shadow-gray-800 border-gray-800 ${snippets.length > 0 ? 'overflow-y-scroll' : ''}`}>
                {snippets.length > 0 && snippets.map((payload) => (
                    <div key={payload._id} className='p-4 flex flex-col bg-[#3a3a3a] text-gray-100  border-b border-gray-300 gap-4'>
                        <span className="text-[1rem] font-semibold border-b w-max">UserId :
                            <span className="ml-2 text-orange-400">{payload._id}</span> </span>
                        <p className="mr-3">{payload.snippet}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default SnippetsDisplay
