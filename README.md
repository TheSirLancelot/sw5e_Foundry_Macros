# sw5e_Foundry_Macros
Just a collection of macros I've created for the SW5e Foundry Game System


## Force Alignment
### Requirements: Midi-QOL, Party Resources, Advanced Macros

1. Once the macro is imported (copy/paste into your new macro, etc.), place the macro name into the "On Use Macro" box, on the "Details" page of **each** power (levels 1-9 only, at-will powers don't matter) of **each** force user in your party
2. Create a Party resource for each of your force users **NOTE: Minimum value must be -100 and max value 100**
3. Change the following lines (surrounded by <>) in the macro to match your new party resources (be sure to add extra `else if` statements if you have more force users):
```
if(actor.name == "<Player Name Goes Here, Must Match Exactly>"){
            currentResource = '<partyResourceID>';
        } else if(actor.name == "<Player Name Goes Here, Must Match Exactly>"){
            currentResource = '<partyResourceID>';
        } else {
		ui.notifications.error("Power was cast by an unknown actor");
		return;
		}
```

When a power is cast, the macro will check to see if the power was ever cast before. If so, it will incrememnt (light side) or decrement (dark side) the current actor's alignment by 1. If the power has never been cast before, it will increment (light side) or decrement (dark side) the current actor's alignment by an amount equal to the power level of the power that was cast. Then, if the actor has hit a threshold on the alignment chart (every 10 points in either direction), the GM will be notified.


## Disturbance Point Management
### Requirements: Midi-QOL, Party Resources, Advanced Macros

1. Once the macros are imported (copy/paste into your new macro, etc.), place the `DisturbancePointMgmt.js` associated macro name (you will need two macros, one for `DisturbancePointMgmt.js` and one for `LongRestDP.js`) into the "On Use Macro" box, on the "Details" page of **each** power (levels 1-9 only, at-will powers don't matter) of **each** force user in your party
2. Create a Party resource for each of your force users. **NOTE: Minimum value must be 0**
3. Change any lines or variable names that refer to game-specific players or resources (e.g. `actor.name == "Enciodas \"Erik\""`, `blitzIsHunted`, `erikDP`, etc.), and add or remove the following `if` block(s) and variable(s) to match the number of force users you have:

```
let blitzDP = window.pr.api.get('blitz_dp')
if(roll.total <= blitzDP){
    ChatMessage.create(
        {
            content: "Blitz is being hunted! (" + roll.total + " vs " + blitzDP + ")",
            whisper: ChatMessage.getWhisperRecipients("GM")
        })
    blitzIsHunted = true
}
```

When a power is cast, the `DisturbancePointMgmt.js` associated macro (DPM) will identify the actor that is casting the force power and increment that player's associated party resource by an amount equal to the power level of the power that was cast, then alert the GM of the increase.

After combat has finished (still working on a way to get this to trigger automatically, still a WIP), manually execute the macro (I advise putting it in the hotbar). Once executed, the DPM will gather the current level of disturbance points for each force user, roll a d100, compare the results, and alert the GM whether each player is hunted or not.

The `LongRest.js` associated macro is to be used when your players take a long rest. The macro will lower the players' associated Disturbance Points by an amount equal to their level. **NOTE: This macro requires you select one of your PC's tokens prior to executing. This allows the macro to know what level your players are** If you already have another macro handling long rest "stuff", you could just copy and paste this in.

Edit: I have created a world script (PostCombatDpMgmt.js) that will hook the 'DeleteCombat' call. You can register this as a world script and the DP management should run after each combat. 

## Snapshot Style
### Requirements: Midi-QOL, Advanced Macros

1. Once the macro is imported (copy/paste into your new macro, etc.), place the macro name into the "On Use Macro" box (as a "After Damage Roll" macro), on the "Details" page of **each** blaster of **each** player with the Snapshot Style fighting style in your party.


## Questions/Comments:

`TheSirLancelot#1337` on discord.
I'm in the **SW5E FOUNDRY DEV** and **Foundry VTT** servers
