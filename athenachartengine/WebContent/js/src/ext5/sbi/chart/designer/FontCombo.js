Ext.define('Sbi.chart.designer.FontCombo',{
    extend:'Ext.form.ComboBox',
    store: {
        fields: [ 'name' ],
        data: [ [ 'Arial' ], [ 'Times New Roman' ], [ 'Tahoma' ], [ 'Verdana' ] ]
    },
    displayField: 'name',
    fieldLabel : 'Carattere',
    tdCls: '',
    editable : false,
    listeners: {
        change: function(sender, newValue, oldValue, opts) {
            this.inputEl.setStyle('font-family', newValue);
        }
    }
});