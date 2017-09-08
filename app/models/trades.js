'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trade = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    requester_id: { type: Schema.Types.ObjectId, ref: 'User' },
    status: String // Enumeration: AVAILBLE, PENDING, CONFIRMED
});

module.exports = mongoose.model('Trade', Trade);
