import {setEvtsOnDivMenu} from "./menu.js";


const onWindowLoad = () => {

    setEvtsOnDivMenu();

    const audio = new Audio("./mp3/audio1.mp3");
    const handlePlayBtn = () => {
        if (audio.paused) {
            void audio.play();
            console.log("audio played");
        } else {
            audio.pause();
            console.log("audio paused");
            audio.currentTime = 0;
        }
    };

    const cards = document.querySelectorAll(".cards .card");
    cards[0].addEventListener("click", handlePlayBtn);
    cards[0].appendChild(audio);
};

const init = () => {
    window.addEventListener('load', onWindowLoad);
};

init();

