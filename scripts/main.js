/*
//Dont distribute without permission
//MADE BY Korean SL
//discord : SL357#1860
//yt : https://www.youtube.com/channel/UC4QoASkshclcoI213KoWoxw

//개인톡 : https://open.kakao.com/o/sOcBMAQc
//채팅방 : https://open.kakao.com/o/gYcpPn6d
*/ 
import{world}from"mojang-minecraft";
let chat = new Map()

/* 채팅 설정 chat set */
let length_limit = 50 //채팅 길이 제한 Chat length limit
let speed_limit = 2 //채팅 빠르기 제한 Chat speed limit (단위:초 unit:second)
/* --------------------- */
speed_limit = speed_limit*20

world.events.beforeChat.subscribe(data => {
    data.cancel = true
    if(data.message){
        if(chat.get(data.sender.name)>0){
            data.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c채팅속도가 너무 빠릅니다."}]}`)
        }else{
            if(data.message.length>length_limit){
                data.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§l§c채팅길이 제한 ${length_limit}자를 넘겨 메시지가 삭제되었습니다."}]}`)
            }else{
                world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text":"<${data.sender.name}> ${data.message}"}]}`)
                chat.set(data.sender.name, speed_limit)
            }
        }
    }
})
world.events.tick.subscribe(data => {
    for(let player of world.getPlayers())chat.set(player.name, chat.get(player.name)-1)
})