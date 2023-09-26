const setEvtOnBtnSubmit = () => {
    const btnSubmit = document.querySelector(".button.submit");
    const handleBtnSubmit = () => {
        const formLogin = document.querySelector(".form.login");

        const inputId = formLogin.querySelector(".id");
        const inputPassword = formLogin.querySelector(".password");

        const id = inputId.value;
        const password = inputPassword.value;

        console.log({id, password});
    };

    btnSubmit.addEventListener("click", handleBtnSubmit);
};

const onWindowLoad = () => {
    setEvtOnBtnSubmit();
};

const init = () => {
    window.addEventListener('load', onWindowLoad);
};

init();