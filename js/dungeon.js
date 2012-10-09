// Devign.Sequence class -- http://devign.me/asynchronous-javascript-queue-sequence/
if (typeof(Devign)=="undefined") var Devign={};

Devign.Sequence=function () {
    // private fields
    this.list=[]; // a list of functions
    this.index=-1;
    this.aborted=false;

    // public fields
    this.finished=false;
};

// public methods
Devign.Sequence.prototype={
    // adds a new function
    add:function (sequenceFunction) {
        this.list.push(sequenceFunction);
    },
    // starts the sequence from the first function
    // fires 'onStart' if exists
    start:function () {
        this.index=-1;
        this.aborted=false;
        this.next();
        if (typeof(this.onStart)=="function") this.onStart();
    },
    // ends the sequence
    // fires 'onEnd' if exists
    end:function () {
        if (typeof(this.onEnd)=="function") this.onEnd();
        this.finished=true;
    },
    // proceeds the sequence
    // if the sequence has finished calls 'end'
    next:function () {
        // if sequence was aborted - ignore next statements
        if (this.aborted) return;

        this.index++;

        if (this.index==this.list.length) return this.end();

        var currFunction=this.list[this.index];

        // calls the function with the sequence as an argument
        if (currFunction) currFunction(this);
    },
    // aborts the sequence by setting the index to 'not started' and the flag aborted to true
    abort:function () {
        this.index=-1;
        this.aborted=true;
    }
};


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
            //result.push('<li><a class="btn cmx" data-target-index="' + k + '"><i class="icon-caret-right"></i></a> ' + v + '</li>');
            result.push('<li><a class="btn cmx" data-target-index="' + k + '"><i class="icon-caret-right"></i> ' + v + '</a></li>');
        });
        result.push('</ul>');

        $('a.cmx').live('click', function(evt) {
            var $elt = $(evt.currentTarget);            
            bootbox.hideAll();
            $('.bootbox').on('hidden', function() {
                callback($elt.data('target-index'));
            });
        });
        bootbox.modal(result.join(''), title);
    }
}

var TextSection = {
    pushText: function(text) {
        var div = $('<div>');
        div.attr('class', 'text').text(text);
        $('.game-text-scroller').append(div);
        $('.game-text-scroller').scrollTo('max', {duration: 500, axis: 'y'});
    }
}
var StaticResource = {
    alignment: ['Lawful Good',
                'Lawful Neutral',
                'Lawful Evil',
                'Chatoic Good',
                'Chatoic Neutral',
                'Chaotic Evil'],
    clazz: ['Human',
            'Elf',
            'Dwarf'],
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
    init: function() {
        bootbox.confirm('Would you like to start a new game?', function(result) {
            GameCreation.create_character();
        });
    },

    create_character: function() {
        var create_sequence=new Devign.Sequence();

        create_sequence.add(function(sequence) {
            bootbox.prompt('What is your name?', function(text) {
                GameCreation.name = text;
                sequence.next();
            });
        });

        create_sequence.add(function(sequence) {
            Utils.choicemodal(StaticResource.alignment, 'Choose an Alignment', function(index) {
                GameCreation.alignment = index;
                sequence.next();
            });

        });
        create_sequence.add(function(sequence) {
            Utils.choicemodal(StaticResource.clazz, 'Choose a Class', function(index) {
                GameCreation.clazz = index;
                sequence.next();
            });
        });

        //create_sequence.add(function(sequence) { return; });
        
        create_sequence.start();
    },
}