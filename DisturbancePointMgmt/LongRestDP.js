main()

async function main(){
    let selected = canvas.tokens.controlled;
    if(selected.length == 0 || selected.length > 1){
        ui.notifications.error("Please select a single token")
        return;
    }
    
    let playerLevel = selected[0].actor.data.data.details.level
    
    window.pr.api.decrement('blitz_dp', playerLevel)
    window.pr.api.decrement('erik_dp', playerLevel)
}