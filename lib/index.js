"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
var path_1 = require("path");
var discord = new discord_js_1.Client();
discord.once('ready', function () {
    var _a;
    console.log("Logged in as " + ((_a = discord.user) === null || _a === void 0 ? void 0 : _a.tag) + "!");
});
discord.on('message', function (message) {
    var _a, _b;
    if (/i\suse\s(they\/them|she\/her|he\/him)/gi.test(message.content)) {
        var guild = message.guild;
        var member = message.member;
        var pronouns_1 = (_a = /they\/them|she\/her|he\/him/i.exec(message.content)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
        var role = guild === null || guild === void 0 ? void 0 : guild.roles.cache.find(function (role) { return role.name.toLowerCase() === pronouns_1; });
        if (role && member) {
            message.channel.send((member.nickname || member.user.username) + " uses " + pronouns_1 + " pronouns");
            member.roles.add(role);
        }
    }
    if (/i\sdo(\snot|n'?t)\suse\s(they\/them|she\/her|he\/him)/gi.test(message.content)) {
        var guild = message.guild;
        var member = message.member;
        var pronouns_2 = (_b = /they\/them|she\/her|he\/him/i.exec(message.content)) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase();
        var role = guild === null || guild === void 0 ? void 0 : guild.roles.cache.find(function (role) { return role.name.toLowerCase() === pronouns_2; });
        if (role && member) {
            message.channel.send((member.nickname || member.user.username) + " does not use " + pronouns_2 + " pronouns");
            member.roles.remove(role);
        }
    }
});
discord.login(fs_1.readFileSync(path_1.join(__dirname, '../discord.token')).toString());
