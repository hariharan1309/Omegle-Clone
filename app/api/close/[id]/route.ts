import { dbConnect } from "../../../../utils/dbConnect";
import Room from '../../../../models/Room';

export const POST = async (req, { params }) => {
    try {
        await dbConnect();
        const room = await Room.findOne({ ID: params.id }).exec();
        if (!room) {
            return new Response("Room not found", { status: 404 });
        } else {
            room.status = "Ended";
            await room.save();
            return new Response("Room Ended", { status: 200 });
        }
    } catch (error) {
        console.log(error.message);
        return new Response("Failed", { status: 500 });
    }
};
