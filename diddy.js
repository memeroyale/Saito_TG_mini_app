const saito = require('../../lib/saito/saito');
const DiddyMain = require('./lib/main');
const ModTemplate = require('../../lib/templates/modtemplate');
const SaitoHeader = require('../../lib/saito/ui/saito-header/saito-header');

class Diddy extends ModTemplate {

        constructor(app) {

                super(app);

                this.app = app;
                this.name = 'Diddy';
                this.slug = 'diddy';

                this.description = 'Module that creates a root website on a Saito node.';
                this.categories = 'Utilities Communications';
                this.class = 'utility';

		this.ui = null;
                this.header = null;
                return this;
        }

	initialize(app) {

		super.initialize(app);

		//
		// this runs whenever Saito is initialized regardless of what app they are using
		//
		this.ui = new DiddyMain(app, this);
		this.header = new SaitoHeader(app, this);

      		//this.addComponent(this.header);
      		this.addComponent(this.ui);

	}

	async render() {

		//
		// this runs when the user views the page /diddy
		//
		super.render();

	}

}
module.exports = Diddy;

