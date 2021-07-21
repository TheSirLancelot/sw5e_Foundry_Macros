main()

async function main(){
	if(args.length > 0){
		let actor = MidiQOL.MQfromActorUuid(args[0].actorUuid);
		let item = await fromUuid(args[0].itemUuid);
		//let itemName = item.name;
		let spellLevel = args[0].spellLevel;
		let currentResource = "";
		let currentAllignmentValue = 0;
		
		if(actor.name == "Enciodas \"Erik\""){
            currentResource = 'erik_align';
        } else if(actor.name == "Blitz"){
            currentResource = 'blitz_align';
        } else {
			ui.notifications.error("Power was cast by an unknown actor");
			return;
		}
		
		currentAllignmentValue = window.pr.api.get(currentResource);
		
		if(getProperty(actor.data, `flags.powerUsed.${item.name}`)){
			//power has been used before
			if(item.labels.school == "Light"){ //power alignment = light
				window.pr.api.increment(currentResource, 1)
				currentAllignmentValue += 1;
			} else if(item.labels.school == "Dark"){
				window.pr.api.decrement(currentResource, 1)
				currentAllignmentValue -= 1;
			}
		} else {
			//power has NOT been used before
			actor.setFlag("sw5e", `powerUsed.${item.name}`, true)
			if(item.labels.school == "Light"){ //power alignment = light
				window.pr.api.increment(currentResource, spellLevel)
				currentAllignmentValue += spellLevel;
			} else if(item.labels.school == "Dark"){
				window.pr.api.decrement(currentResource, spellLevel)
				currentAllignmentValue -= spellLevel;
			}
		}
		
		if(currentAllignmentValue != 0 && currentAllignmentValue % 10 == 0){
            ChatMessage.create(
                {
                    content: actor.name + "'s allignment has hit a threshold! (" + currentAllignmentValue + ")",
                    whisper: ChatMessage.getWhisperRecipients("GM")
                })
		}
		
	} else {
		ui.notifications.error("No arguments passed by onUse");
		return;
	}
}
