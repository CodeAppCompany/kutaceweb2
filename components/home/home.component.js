$(window).on("load", () => {
    system.htmlObjects.hide(
        'loading-page', false
    );
});

$(document).ready(() => {

    //Initialized the initial components
    async function ngOnInit(){
        console.log('home component loaded...');
    }
    ngOnInit();

});