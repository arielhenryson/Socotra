import {DB} from "../lib/db";
import {setConfig} from "../global";


describe('database class', () => {
    it('test should connect to database', (done) => {
        const config = require('../../config/config.json');
        setConfig(config);


        let db = new DB();
        db.promiseConnection().then(() => {
            done();
        });
    }, 1000 * 13);


    it('expect isValidId to say 5746b63b8f20bdd60741418a is valid _id', () => {
        const validID = DB.isValidId("5746b63b8f20bdd60741418a");
        expect(validID).toEqual(true);
    });

    it('expect isValidId to say ABC is not valid _id', () => {
        const validID = DB.isValidId("ABC");
        expect(validID).toEqual(false);
    });

    it('expect createNewId to create valid id', () => {
        const newID = DB.createNewId();
        const isNewKeyValid = DB.isValidId(newID);
        expect(isNewKeyValid).toEqual(true);
    });

    it('expect createNewId to create valid id from 5746b63b8f20bdd60741418a', () => {
        const newID = DB.createNewId("5746b63b8f20bdd60741418a");
        const isNewKeyValid = DB.isValidId(newID);
        expect(isNewKeyValid).toEqual(true);
    });

    it('expect makeDoc to add _createTime as type Date', () => {
        const doc: any = DB.makeDoc({});
        expect(doc._createTime instanceof Date).toBe(true);
    });

    it('expect makeNewSolt to create random string', () => {
        const randomSolt = DB.makeNewSolt();

        expect(typeof randomSolt).toBe("string");
    });
});