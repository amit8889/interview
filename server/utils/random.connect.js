

let active_user = 0;
const active_offer=new Map()
//socketId : offer

//group list
const group_map = new Map();

let matching_queue = []
//{
//    socketId1:{offer}
//    socketId1:{offer}
//}


const handleMatching =(group_id,io)=>{
    if(!group_map || !group_map.get(group_id) || group_map.get(group_id).length<2){
        //minium  2 candidte require in a group for connection 
        return;
    }
    console.log('=========================',group_id)
    //console.log(group_map)
    //getting socket id of  both user
    const user1 = group_map.get(group_id).pop()
    const user2 = group_map.get(group_id).pop()
    const user_details1 = active_offer.get(0)[user1];
    const user_details2 = active_offer.get(0)[user2];
    console.log("============ud")
   // console.log(active_offer)
    if(!user_details1){
        group_map.get(group_id).push(user2)
        return;
    }
    if(!user_details2){
        group_map.get(group_id).push(user1)
        return;
    }
    console.log("============1======21=======")
   let match_obj ={
        from: user1,
        remote_offer : user_details1,
        id : group_id,
        to : user2
    }
    //statuse inactive for both user
    // delete active_offer[user1];
    // delete active_offer[user1];
    console.log('=============mtob============',match_obj)
    matching_queue.push(match_obj);
    establish_connection(io);

}

const establish_connection =(io)=>{
    const data =  matching_queue.pop()

    //check user disconnect and handle it



    
    //send answer mean offer to device in which it return a answer and set that answer to another device 
    console.log('============off=============',)
   // io.to(data.to).emit('offer',data);

}


module.exports={
    active_user,
    group_map,
    matching_queue,
    active_offer,
    matching_queue,
    handleMatching
}