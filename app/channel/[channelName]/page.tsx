'use client'
import React,{useState}  from 'react';
import { useRouter } from 'next/navigation';
import Call from "../../../components/Call";

export default function Page({ params }: { params: { channelName: string } }) {
    const router = useRouter();
    const [roomId, setRoomId] = useState(params.channelName);
  
    const getRoom = async () => {
      const response = await fetch('/api/room');
      const data = await response.json();
      return data;
    };
  
    const createRoom = async () => {
      const response = await fetch('/api/room', { method: 'POST' });
      const data = await response.json();
      return data._id;
    };
  
    const updateRoom = async (id: string, status: string) => {
      try {
        const response = await fetch(`/api/room?id=${id}&status=${status}`, {
          method: 'PUT',
        });
  
        if (!response.ok) {
          throw new Error('Failed to update room');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update room');
      }
    };
  
    const closeRoom = async () => {
      if (roomId) {
        await updateRoom(roomId, 'Waiting');
        setRoomId('');
        router.push("/");
      } else {
        console.log('Join the Room First');
      }
    };
  
    const skipRoom = async () => {
      await updateRoom(roomId, 'Active');
      const rooms = await getRoom();
      const nextRooms = rooms.filter((room) => room._id !== roomId);
      if (nextRooms.length > 0) {
        router.push(`/channel/${nextRooms[0]._id}?status=join`);
        setRoomId(nextRooms[0]._id);
        await updateRoom(nextRooms[0]._id, 'Active');
      } else {
        const id = await createRoom();
        router.push(`/channel/${id}?status=create`);
      }
    };
    return (
        <main className="flex w-screen h-screen flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full px-10 m-2 z-10">
                <div className="flex items-center gap-x-2">
                    <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                    <div>
                        <h1 className="text-xl font-semibold capitalize text-slate-500">Mia John</h1>

                        <p className="text-sm text-gray-800 dark:text-gray-400">Room Id :{roomId}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-nowrap justify-center gap-5 ">
                    <div className="text-white text-xs flex flex-row flex-nowrap items-center bg-blue-500 hover:bg-blue-600 hover:scale-110 duration-300 cursor-pointer gap-1 rounded-md font-medium py-1 px-2" onClick={skipRoom} >
                    <span>SKIP</span>
                    <svg className="h-5 w-5 fill-white"  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V4Z" fill="current"/>
                        <path d="M3 4.94743C3 3.5226 4.61175 2.69498 5.7697 3.52521L16.2394 11.0318C17.2443 11.7523 17.2053 13.2593 16.1646 13.927L5.69492 20.6434C4.53019 21.3905 3 20.5542 3 19.1704V4.94743Z" fill="current"/>
                    </svg>
                    </div>

                    <div className="flex flex-row text-xs flex-nowrap text-white items-center bg-red-500 hover:bg-red-600 hover:scale-110 duration-300 cursor-pointer gap-1 rounded-md font-medium py-1 px-2" onClick={closeRoom} >
                    <span>CLOSE</span>
                    <svg className="h-5 w-5 fill-white"  style={{ enableBackground: 'new 0 0 24 24' }} version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="info"/>
                        <g id="icons">
                        <g id="exit2">
                            <path d="M12,10c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2s-2,0.9-2,2v4C10,9.1,10.9,10,12,10z"/>
                            <path d="M19.1,4.9L19.1,4.9c-0.3-0.3-0.6-0.4-1.1-0.4c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.2,0.8,0.4,1.1l0,0c0,0,0,0,0,0c0,0,0,0,0,0    c0,0,0,0,0,0c1.3,1.3,2,3,2,4.9c0,3.9-3.1,7-7,7s-7-3.1-7-7c0-1.9,0.8-3.7,2.1-4.9l0,0C7.3,6.8,7.5,6.4,7.5,6c0-0.8-0.7-1.5-1.5-1.5    c-0.4,0-0.8,0.2-1.1,0.4l0,0C3.1,6.7,2,9.2,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,9.2,20.9,6.7,19.1,4.9z"/>
                        </g>
                        </g>
                    </svg>
                    </div>
                </div>
                </div>
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APPID!} channelName={params.channelName}></Call>
        </main>
    )
}