"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameChannel = void 0;
var nameChannel = function (options) {
    var branchName = options.branchName;
    var channelName = branchName.replace('/', '-').toLowerCase();
    console.log(channelName);
};
exports.nameChannel = nameChannel;
