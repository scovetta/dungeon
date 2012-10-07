var Utils = {
    msgbox: function(message, options) {




    },

    roll: function(type) {
        var parts = type.split('d');
        var roll = type[0], die = type[1];
        var total = 0;

        while(--roll) {
            total += Math.round(1 + Math.random() * die);
        }
    
        return total;
    }
}
var GameCreation = {
    name: null,
    gender: null,
    race: null,
    clazz: null,
    alignment: null,
    religion: null,
    height: 0,
    weight: 0,
    looks: null,

    attribute: {
        strength: 0,
        intelligence: 0,
        wisdom: 0,
        constitution: 0,
        dexterity: 0,
        charistma: 0,
    },

    spell: [],
    inventory: [],

    choose_alignment: function() {
        Utils.msgbox({
            title: 'Choose an alignment',
            message: 'Choose an alignment',
            type: 'choice',
            choices: ['Lawful Good',
                      'Lawful Neutral',
                      'Lawful Evil',
                      'Chatoic Good',
                      'Chatoic Neutral',
                      'Chaotic Evil'],
            complete: function(elt) {
                this.alignment = elt.value;
            }
        })
    },

    create_character: function() {
        Utils.msgbox_simple('name');
        Utils.msgbox_simple('gender');
        choose_alignment();
    }
}