/* eslint-disable indent */
// todo: enable this line of code for insertion data operation to use uuid as id
// const { v4: uuid } = require('uuid');
const axios = require('axios');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { successMessage } = require('src/app/schema/loggerFormat/userFormat');
const { JOB } = require('src/config/constants/Constants');

class JobService {
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor() { }

    /**
     * list job data from request
     *
     * @param {Object} payload - payload.
     * @returns {promise<array>} - Resolves to a list of job.
     * @memberof JobService
     */
    static async retrieveJobs(payload) {
        try {
            let url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json?';

            const filterEntries = Object.entries(payload);
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of filterEntries) {
                switch (key) {
                    case 'description':
                        url += `description=${value}&`;
                        break;
                    case 'location':
                        url += `location=${value}&`;
                        break;
                    case 'full_time':
                        url += `full_time=${value}&`;
                        break;
                    case 'page':
                        url += `page=${value}&`;
                        break;
                    default:
                        break;
                }
            }

            const result = await axios.get(`${url}`)
                .then((resp) => resp.data)
                .catch(() => []);

            logger.info(logMsg(
                JOB.INFO,
                successMessage(payload, JOB.LIST_SUCCESSFUL_RESPONSE)
            ));

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * detail job data from request
     *
     * @param {Object} payload - payload.
     * @returns {promise<array>} - Resolves to a detail of job.
     * @memberof JobService
     */
    static async retrieveJob(id) {
        try {
            const result = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`)
                .then((resp) => resp.data);
            if (this.isEmpty(result)) throw new Error('No data found');
            logger.info(logMsg(
                JOB.INFO,
                successMessage(JOB.DETAIL_SUCCESSFUL_RESPONSE)
            ));

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}

module.exports = JobService;
