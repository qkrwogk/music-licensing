const setEvtOnBtnTitle = () => {
    const divMenu = document.querySelector(".menu");
    const btnTitle = divMenu.querySelector(".title");
    const handleBtnTitle = () => {
        console.log("titleBtn clicked");
        document.location.href='/';
    };

    btnTitle.addEventListener("click", handleBtnTitle);
}

const setEvtOnBtnLogin = () => {
    const divMenu = document.querySelector(".menu");
    const btnLogin = divMenu.querySelector(".button.login");
    const handleBtnLogin = () => {
        document.location.href = "/signin";
    };

    btnLogin.addEventListener("click", handleBtnLogin);
};

export const setEvtsOnDivMenu = () => {
    setEvtOnBtnTitle();
    setEvtOnBtnLogin();
};