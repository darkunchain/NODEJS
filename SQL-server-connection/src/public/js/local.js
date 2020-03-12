//initselects
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var options = document.querySelectorAll('option');
    var instances = M.FormSelect.init(elems, options);
    $('#generar').click(function () {
        var instance = M.FormSelect.getInstance($('#seleccione'));
        let _d = instance.getSelectedValues();
        console.log('valores seleccionados:',_d);        
    });
});