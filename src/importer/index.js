// importer/src/importService.js
const fs = require('fs');
const path = require('path');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

// JSONObserver module
const JSONObserver = {
    list: function() {
        console.log("Listing all available JSON files!");
        try {
            const files = fs.readdirSync("/data");
            files.filter(file => file.endsWith(".json")).forEach(this.processFile);
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: function(fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join("/data", fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        JSONObserver.parse(content);
    },

    parse: function(content) {
        console.log(`JSON Content of the file: \n${content}`);
        try {
            const data = JSON.parse(content);
            data.forEach(async item => {
                await JSONObserver.insertData(item);
            });

        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return;
        }
    },

    insertData: async function(item) {
        try {
            const {
                caucus, congress_numbers, current, description, district, enddate, extra,
                leadership_title, party, person, phone, role_type, senator_class, senator_rank, startdate,
                state, title, title_long, website
            } = item;

            const senatorId = await knex('senators').insert({
                caucus, current, description, district, enddate, leadership_title, party,
                bioguideid: person.bioguideid, birthday: person.birthday, cspanid: person.cspanid,
                firstname: person.firstname, gender: person.gender, lastname: person.lastname,
                link: person.link, middlename: person.middlename, name: person.name, namemod: person.namemod,
                nickname: person.nickname, osid: person.osid, sortname: person.sortname, twitterid: person.twitterid,
                youtubeid: person.youtubeid, phone, role_type, senator_class, senator_rank, startdate,
                state, title, title_long, website, created_by: 'importer', created_at: new Date(), updated_at: new Date()
            }).returning('id');

            for (const congress_number of congress_numbers) {
                await knex('congress_numbers').insert({
                    senator_id: senatorId[0], congress_number, created_by: 'importer', created_at: new Date(), updated_at: new Date()
                });
            }

            await knex('extra').insert({
                senator_id: senatorId[0], address: extra.address, contact_form: extra.contact_form, office: extra.office,
                rss_url: extra.rss_url, created_by: 'importer', created_at: new Date(), updated_at: new Date()
            });

            console.log(`Imported data for senator: ${person.firstname} ${person.lastname}`);
        } catch (error) {
            console.error(`Error inserting data into the database: ${error}`);
        }
    }
};

// Application Module
const ImporterApplication = {
    start: function() {
        JSONObserver.list();

        // Start a minimal supervision tree (Simulated as there's no real equivalent in Node.js)
        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
