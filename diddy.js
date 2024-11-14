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



        async onConfirmation(blk, tx, conf) {           

                let txmsg = tx.returnMessage();

console.log("into on confirmation: " + JSON.stringify(txmsg));

                if (conf == 0) {
                	if (txmsg.module === this.name) {
                		if (txmsg.request === 'click') {
					this.receiveClickTransaction(tx);
				}
			}
		}
	}

        async createClickTransaction() {

                let newtx = await this.app.wallet.createUnsignedTransactionWithDefaultFee();
                newtx.msg = {
                        module: this.name,
                        request: "click",
                };
                await newtx.sign();
                return newtx;
        }

	receiveClickTransaction(tx) {
		console.log("#");
		console.log("#");
		console.log("# Recieved Click Tx");
		console.log("# " + JSON.stringify(tx.returnMessage()));
		console.log("#");
		console.log("#");
		console.log("received a click transaction...");
	}

	async render() {

		//
		// this runs when the user views the page /diddy
		//
		super.render();

	}

}
module.exports = Diddy;

