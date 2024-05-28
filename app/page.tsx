'use client'
import React,{useState}  from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>('');

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

  const JoinRoom = async () => {
    const rooms = await getRoom();
    if (rooms.length > 0) {
      router.push(`/channel/${rooms[0]._id}?status=join`);
      await updateRoom(rooms[0]._id, 'Active');
    } else {
      const id = await createRoom();
      router.push(`/channel/${id}?status=create`);
    }
  };

  const closeRoom = async () => {
    if (roomId) {
      await updateRoom(roomId, 'Waiting');
      setRoomId('');
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
          <section className="flex flex-col items-center bg-white w-full min-h-screen">
              <h1 className="text-4xl font-bold mt-[20vw]">Welcome to Omegle Clone</h1>
              <button onClick={JoinRoom} className="bg-blue-500 hover:bg-blue-600 flex flex-row gap-2 hover:scale-110 duration-300 flex-norwap items-center  text-white font-medium py-2 px-4 rounded-md mt-5">
                <span>Join</span>
                <svg className="fill-white h-7 w-7" id="Layer_1" style={{enableBackground:"new 0 0 128 128"}}  version="1.1" viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g>
                  <polygon points="79.9,98.9 114.8,64 79.9,29.1 74.2,34.8 99.5,60 36,60 36,68 99.5,68 74.2,93.2  "/><rect height="8" width="8" x="16" y="60"/></g>
                </svg>
              </button>
          </section>
        );
    }
