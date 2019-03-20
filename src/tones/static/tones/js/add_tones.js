'use strict';

{   
    let count = Number(document.getElementById('id_pedal-TOTAL_FORMS').getAttribute('value'), 10);
    let pedalTemplate = document.getElementById('pedal-template');

    const addButton = document.getElementsByClassName('add-pedal');
    addButton.addEventListner('click', (e) => {
        e.preventDefault();
    });
}