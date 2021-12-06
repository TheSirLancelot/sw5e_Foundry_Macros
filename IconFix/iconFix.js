async function fix(item){
    const curImg = await fetch(item.data.img);
    if (curImg.ok){
        return;
    } else {
        console.log("Fixing: " + item.data.name);
        const path = fixedPath(item.data.name, item.data.img);
        if (path) item.update({'img': path});
    }
    return;
}

function fixedPath(name, curImg){
    name = name.replace(/(\b\w+\b)/g, (match, p1) => (p1.charAt(0).toUpperCase() + p1.slice(1)));
    name = name.replace(/[,\\]/g, '-');
    name = name.replace(/\s/g, '');
    name = name.replace(/^\(([^)]*)\)/g, '$1-');
    name = name.replace(/-*\(([^)]*)\)/g, '-$1');
    curImg = curImg.replace(/^[\w\W]*\/systems/, 'https://assets.forge-vtt.com/5fd6f6581a7471c40e3a97a6/systems'); //change your asset ID to match
    return curImg.replace(/(^|[/])[^/]*$/g, `/${name}.webp`);
}

for (const item of game.items) {
    if(item.data.img.includes("Class%20Features")){ //change for which folder you want. HIGHLY recommend doing one at a time
        fix(item);
    }
}

//for (const actor of game.actors) {
//    for (const item of actor.data.items) fix(item);
//}
