let targetX = args[0].targets[0]._object._validPosition.x;
let targetY = args[0].targets[0]._object._validPosition.y;


let actorX = canvas.tokens.controlled[0]._validPosition.x;
let actorY = canvas.tokens.controlled[0]._validPosition.y;

let distanceInPixels = Math.sqrt(Math.pow((targetX - actorX), 2) + Math.pow((targetY - actorY), 2));
let distanceInGrids = distanceInPixels / canvas.scene.dimensions.size;
let distanceInFeet = distanceInGrids * canvas.scene.dimensions.distance;

if (distanceInFeet < 30) {
    for (let result of args[0].damageRoll.terms[0].results) {
        if (result.result == 1) {
            let diceroll = args[0].damageRoll._formula;
            let workflow = MidiQOL.Workflow.getWorkflow(args[0].uuid);
            workflow.damageRoll = await new Roll(diceroll).roll();
            workflow.damageRollHTML = await workflow.damageRoll.render();
            ChatMessage.create({content:  "You rolled a 1, but it was re-rolled to a " + workflow.damageRoll.terms[0].results[0].result + "."});
        }
    }
}
