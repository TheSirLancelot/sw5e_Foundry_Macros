main()

async function main(){
    if(args.length > 0){
        let actor = await fromUuid(args[0].actorUuid)
        let spellLevel = args[0].spellLevel
        
        if(actor.name == "Enciodas \"Erik\""){
            window.pr.api.increment('erik_dp', spellLevel)
            ChatMessage.create(
                {
                    content: "Erik's Disturbance Points have increased",
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
        } else if(actor.name == "Blitz"){
            window.pr.api.increment('blitz_dp', spellLevel)
            ChatMessage.create(
                {
                    content: "Blitz's Disturbance Points have increased",
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
        }
    } else { //macro is manually executed after combat
        let blitzIsHunted = false
        let erikIsHunted = false
        
        let roll = new Roll('1d100').roll()
        let blitzDP = window.pr.api.get('blitz_dp')
        let erikDP = window.pr.api.get('erik_dp')
        
        
        if(roll.total <= blitzDP){
            ChatMessage.create(
                {
                    content: "Blitz is being hunted! (" + roll.total + " vs " + blitzDP + ")",
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
            blitzIsHunted = true
        }
        
        if(roll.total <= erikDP){
            ChatMessage.create(
                {
                    content: "Erik is being hunted! (" + roll.total + " vs " + erikDP + ")",
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
            erikIsHunted = true
        }
        
        if(blitzIsHunted == false && erikIsHunted == false){
            ChatMessage.create(
                {
                    content: "No hunting this time: " + roll.total + " vs " + erikDP + " & " + blitzDP,
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
        }
    }
}
