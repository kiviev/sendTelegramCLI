const argv = require('yargs').argv;
const sendTG = require('./SendTG');

class HandleArgs{
	static getOptionsFromArgvTg(){
		let args = argv;
		let ret = {}
		switch (true) {
			case (typeof args.sendto !== 'undefined' || typeof args.s !== 'undefined'):
				ret.type = args.sendto || args.s;;
			case typeof args.id !== 'undefined' || typeof args.i !== 'undefined':
				ret.chat_id = args.id || args.i;;
			case typeof args.text !== 'undefined' || typeof args.T !== 'undefined':
				ret.text = args.text || args.T;;
			case typeof args['type-msg'] !== 'undefined' || typeof args.t !== 'undefined':
				ret.type_msg = args['type-msg'] || args.t;;
			case typeof args.path !== 'undefined' || typeof args.p !== 'undefined':
				ret.path = args.path || args.p;;
			case typeof args.thumbnail !== 'undefined' || typeof args.th !== 'undefined':
				ret.thumb_path = args.thumbnail || args.th;;
			case typeof args.caption !== 'undefined' || typeof args.c !== 'undefined':
				ret.caption = args.caption || args.c;
		}
		return Object.entries(ret).length === 0 ? false : ret;

	}

	static sendTGMsg(){
		let options = HandleArgs.getOptionsFromArgvTg();
		if ((options && Object.entries(options).length !== 0) && (['user', 'group'].includes(options.type) && ['text', 'image','video'].includes(options.type_msg))){
			switch (options.type_msg) {
				case 'text':
					sendTG.sendText(options);
					break;
				case 'image':
					sendTG.sendImage(options);
					break;
				case 'video':
					sendTG.sendVideo(options);
					break;

				default:
					break;
			}

		}
	}
}
module.exports = HandleArgs;
