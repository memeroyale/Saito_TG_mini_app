const saito = require('../../lib/saito/saito');
const ModTemplate = require('../../lib/templates/modtemplate');

class Diddy extends ModTemplate {

        constructor(app) {

                super(app);

                this.app = app;
                this.name = 'Diddy';
                this.slug = 'diddy';

                this.description = 'Module that creates a root website on a Saito node.';
                this.categories = 'Utilities Communications';
                this.class = 'utility';

                this.header = null;
                return this;
        }

	initialize(app) {

		super.initialize(app);

		//
		// this runs whenever Saito is initialized regardless of what app they are using
		//


	}

	render() {

		//
		// this runs when the user views the page /diddy
		//

	}

}
module.exports = Diddy;

