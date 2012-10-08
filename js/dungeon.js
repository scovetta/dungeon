var Utils = {
    roll: function(type) {
        var parts = type.split('d');
        var roll = type[0], die = type[1];
        var total = 0;

        while(--roll) {
            total += Math.round(1 + Math.random() * die);
        }
    
        return total;
    },
    choicemodal: function(choices, title, callback) {
        var result = ['<ul class="unstyled choices">'];
        $.each(choices, function(k, v) {
            result.push('<li><a class="btn cmx" data-target-index="' + k + '"><i class="icon-caret-right"></i></a> ' + v + '</li>');
        });
        result.push('</ul>');

        $('a.cmx').live('click', function(evt) {
            var $elt = $(evt.currentTarget);
            callback($elt.data('target-index'));
            bootbox.hideAll();
        });
        bootbox.modal(result.join(''), title);
    }
}

var StaticResource = {
    alignment: ['Lawful Good',
                'Lawful Neutral',
                'Lawful Evil',
                'Chatoic Good',
                'Chatoic Neutral',
                'Chaotic Evil'],
};

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

    create_character: function() {
        bootbox.prompt('What is your name?', function(text) {
            GameCreation.name = text;
        });

        Utils.choicemodal(StaticResource.alignment, 'Choose an Alignment', function(index) {
            GameCreation.alignment = index;
        });
    },
}