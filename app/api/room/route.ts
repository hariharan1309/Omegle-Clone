import { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '../../../utils/dbConnect';
import Room from '../../../models/Room';

export const GET=async(req:NextApiRequest,res:NextApiResponse)=>{
    try {
       await dbConnect();
       const room=await Room.find({status:"Waiting"});
       return new Response(JSON.stringify(room),{status:200})
    } catch (error) {
        console.log(error.message);
        return new Response("Failed",{status:500});
    }
}

export const POST=async(req:NextApiRequest,res:NextApiResponse)=>{
    try {
        await dbConnect();
        const room=await Room.create({status:"Waiting"});
        return new Response(JSON.stringify(room),{status:200});
    } catch (error) {
        console.log(error.message);
        return new Response("Failed",{status:500});
    }
}

export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await dbConnect();
      const { searchParams } = new URL(req.url);
      const id=searchParams.get("id")
      const status=searchParams.get("status")

      const room = await Room.findByIdAndUpdate(id, { status: status }, { new: true });
      console.log(room);
  
      if (!room) {
        return new Response("Room not found", { status: 404 });
      }
      return new Response(JSON.stringify(room), { status: 200 });
    } catch (error) {
      console.error(error.message);
      return new Response("Failed", { status: 500 });
    }
  }