# Force Alignment
## Requirements: Midi-QOL, Party Resources

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
