/* SuperSelect is the class */
function SuperSelect(selector) {
    this.selector = selector;
    this.options = [
        {value: 'A', textNode: 'texte A'},
        {value: 'B', textNode: 'texte B'},
        {value: 'C', textNode: 'texte C', selected: true},
        {value: 'D', textNode: 'texte D'}
    ];
    this.refresh();
}
SuperSelect.prototype.init = function() {
    // we can add here the feature removeDuplicates but let KISS (keep it super simple)
    this.addSelectAndTbody();
    $('tbody tr:first-child a:nth-child(3)').hide();
    $('tbody tr:last-child a:nth-child(4)').hide();
    this.addListeners();
}
SuperSelect.prototype.destroy = function() {
    $(self.selector + ' #addAction').off( "click" );
    $(this.selector + ' select').remove();
    $(this.selector + ' tbody').remove();
}
SuperSelect.prototype.refresh = function() {
    this.destroy();
    this.init();
}
SuperSelect.prototype.addSelectAndTbody = function() {
    $('#editValues').hide(); // hide the inputs for editing an option
    var mySelect = '<select class="form-control" id="exampleFormControlSelect1">';
    var myTbody = '<tbody>';
    this.options.forEach(function (option) {
        mySelect += '<option ';
        if (option.selected) mySelect += 'selected="selected" ';
        mySelect += 'value="' + option.value;
        mySelect += '">' + option.textNode + '</option>';
        myTbody += '<tr>';
        myTbody += '<th scope="row">' + option.value + '</th>';
        myTbody += '<td>' + option.textNode + '</td>';
        myTbody += 'value="' + option.value;
        myTbody += '">' + option.textNode + '</option>';
        myTbody += '<td><input type="radio" name="' + option.value + '"';
        if (option.selected) myTbody += ' checked';
        myTbody += '></td>';
        myTbody += '<td><a href=""><i class="fas fa-trash"></i></a><a href=""><i class="fas fa-edit"></i></a>';
        myTbody += '<a href=""><i class="fas fa-chevron-up"></i></a><a href="">'; 
        myTbody += '<i class="fas fa-chevron-down"></i></a></td>';
        myTbody += '</tr>';
    });
    mySelect += '</select>';
    myTbody += '</tbody>';
    $(mySelect).insertAfter(this.selector + ' #selectLabel');
    $(myTbody).insertAfter(this.selector + ' thead');
}
SuperSelect.prototype.addListeners = function() {
    var self = this; 
    // add button
    $(self.selector + ' #addAction').one('click', function(event) {
        event.preventDefault();
        self.addOption();
    });
    // selected option
    $(self.selector + ' tbody [type=radio]').one('click', function(event) {
        var index = $(self.selector + ' tbody [type=radio]').index($(event.target));
        self.options.forEach(function (option) {
            option.selected = false;
        })
        self.options[index].selected = true;
        self.refresh();
    });
    // all links in the table
    $(self.selector + ' tbody a').one('click', function(event) {
        event.preventDefault();
    });
        // remove action
    $(self.selector + ' tbody a:nth-child(1)').one('click', function(event) {
        var index = $(self.selector + ' tbody tr').index($(this).parent().parent());
        self.removeOption(index);
    });
        // edit action
    $(self.selector + ' tbody a:nth-child(2)').one('click', function(event) {
        var index = $(self.selector + ' tbody tr').index($(this).parent().parent());
        $('#ok').data({'index': index});
        $('#optionValue').val(self.options[index].value);
        $('#optionText').val(self.options[index].textNode);
        $('#editValues').slideDown();
    });
            // value and text node inputs
    $(self.selector + ' #ok').one('click', function(event) {
        event.preventDefault();
        var index = $('#ok').data().index;
        var optionValue = $('#optionValue').val();
        var optionText = $('#optionText').val();
        self.editOption(index, optionValue, optionText);
        self.refresh();
    });
        // move up action
    $(self.selector + ' tbody a:nth-child(3)').one('click', function(event) {
        var index = $(self.selector + ' tbody tr').index($(this).parent().parent());
        self.moveOption(index, true);
        self.refresh();
    });
        // move down action
    $(self.selector + ' tbody a:nth-child(4)').one('click', function(event) {
        var index = $(self.selector + ' tbody tr').index($(this).parent().parent());
        self.moveOption(index);
        self.refresh();
    });
}
SuperSelect.prototype.addOption = function() {
    var len = this.options.length;
    this.options.push({value: 'new' + len, textNode: 'nouveau texte ' + len});
    this.refresh();
}
SuperSelect.prototype.editOption = function(optionIndex, newValue, newText) {
    var newOption = {value: newValue, textNode: newText};
    this.options[optionIndex] = newOption;
    this.refresh();
}
SuperSelect.prototype.removeOption = function(optionIndex) {
    this.options.splice(optionIndex, 1);
    this.refresh();
}
SuperSelect.prototype.moveOption = function(optionIndex, up) {
    up == true ? destinationIndex = optionIndex - 1 : destinationIndex = optionIndex + 1;
    var destinationActualOption = this.options[destinationIndex];
    this.options[destinationIndex] = this.options[optionIndex];
    this.options[optionIndex] = destinationActualOption;
    this.refresh();
}
var mySuperSelect = new SuperSelect('#mySuperSelect');