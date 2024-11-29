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

        this.diddy = { count: 0 };
        this.ui = null;

        return this;
    }

    initialize(app) {
        super.initialize(app);

        //
        // updates this.diddy
        //
        this.load();

        // Initialize components
        this.ui = new DiddyMain(app, this);
        this.header = new SaitoHeader(app, this);

        // Add components to the app
        this.addComponent(this.ui);
        this.addComponent(this.header); // Register the header as a component
    }

    async render() {
        //
        // This runs when the user views the page /diddy
        //
        super.render();

        // Explicitly render the header
        if (this.header) {
            this.header.render();
        }
    }

    async onConfirmation(blk, tx, conf) {
        let diddy_mod = this.app.modules.returnModule(this.name);
        let txmsg = tx.returnMessage();

        if (conf == 0) {
            if (txmsg.module === this.name) {
                if (txmsg.request === 'click') {
                    this.receiveClickTransaction(tx);
                    try {
                        let publickey = tx.from[0].publicKey;
                        diddy_mod.addOrUpdateRecords(publickey);
                    } catch (err) {
                        console.log("Database Issues: " + JSON.stringify(err));
                    }
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
        console.log("# Received Click Tx");
        console.log("# " + JSON.stringify(tx.returnMessage()));
        console.log("#");
        console.log("received a click transaction...");
    }

    save() {
        this.app.options.diddy = this.diddy;
        this.app.storage.saveOptions();
    }

    load() {
        if (this.app.options.diddy) {
            this.diddy = this.app.options.diddy;
        } else {
            this.diddy = {
                count: 0
            };
        }
    }

    async addOrUpdateRecords(publickey = '', count = 0) {
        let sql, params, res;

        // Insert if does not exist
        sql = `INSERT OR IGNORE INTO records (publickey) VALUES ($publickey)`;
        params = { $publickey: publickey };
        res = await this.app.storage.runDatabase(sql, params, 'diddy');

        // Then update
        sql = `UPDATE records SET count = count+1 WHERE publickey LIKE BINARY "$publickey"`;
        params = { $publickey: publickey };
        res = await this.app.storage.runDatabase(sql, params, 'diddy');
    }
}

module.exports = Diddy;
