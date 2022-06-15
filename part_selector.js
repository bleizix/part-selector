//@ts-check

// NAME: time_selector
// AUTHOR: Bleizix
// DESCRIPTION: Set a range that will be played.

/// <reference path="../../spicetify-cli/globals.d.ts" />

let start_position = 0
let end_position = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const msToMinutesSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
};

async function shownotif_START_POSITION() {
    
    start_position = Spicetify.Player.getProgress()
    
    
    let start_position_TEXT = msToMinutesSeconds(start_position)
    Spicetify.showNotification(`Start position set to ${start_position_TEXT} `)
    while (Spicetify.Player.isPlaying){
        await sleep(1000);
        let time = Spicetify.Player.getProgress();
        if (time >= end_position) {
            Spicetify.Player.seek(start_position)
        }
    }
    
}
async function shownotif_END_POSITION(){

    end_position = Spicetify.Player.getProgress()

    let end_position_TEXT = msToMinutesSeconds(end_position)
    Spicetify.showNotification(`End position set to ${end_position_TEXT}`)
}
function reset(){
    start_position = 0
    end_position = 0
}
Spicetify.Player.addEventListener("songchange", () => {
    start_position = 0
    end_position = 0
});

Spicetify.Mousetrap.bind('r', reset)

Spicetify.Mousetrap.bind('d', shownotif_START_POSITION)
Spicetify.Mousetrap.bind('f', shownotif_END_POSITION)

