const request = require('request');
const fs = require('fs-extra');

class SendTG {

  static getUrl(){
    if (!process.env.TG_TOKEN) {
      console.error('No se ha encontrado el token');
      return false;
    }
    return "https://api.telegram.org/bot" + process.env.TG_TOKEN + "/";
  }

  static async getChatId(type , chat_id){
    let uri = SendTG.getUrl();
    let options = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: uri ? uri + "getUpdates" : false,
      json: true
    };
    if(!options.url) return false;
    return new Promise((resolve, reject) => {
      request.post(options, (error, response, body) => {
        if (error) reject(error);

        let result = body.result;
        if(result && result.length){
          if(type == 'user'){
            let res = SendTG.getChatIdFromUser(result,chat_id);
            if(res) resolve(res);
            else reject('No se ha encontrado el usuario');
          }else if(type == 'group'){
            let res = SendTG.getChatIdFromGroup(result, chat_id);
            if (res) resolve(res);
            else reject('No se ha encontrado el grupo');
          }
        }
      });

    }).catch(error => console.error('Ha habido un ERROR: ', error));
  }

  static getChatIdFromUser(data,id) {
    for (let i in data) {
      let msg = data[i].message;
      if (msg && msg.from && msg.from.username && msg.from.username == id) {
        return msg.from.id;
      }
    }
    return false;
  }
  static getChatIdFromGroup(data,id) {
    for (let i in data) {
      let msg = data[i].message;
      if (msg && msg.chat && msg.chat.title && msg.chat.title == id) {
        return msg.chat.id;
      }
    }
    return false;
  }

  static async sendVideo(options) {
    let formData = {duration : 10};

    if (options.type && options.chat_id) {
      formData.chat_id = await SendTG.getChatId(options.type, options.chat_id);
    }
    if (typeof options.path == 'string' && options.path !== '') {
      let video = fs.createReadStream(options.path);
      formData.video = video;
    }
    if (typeof options.thumb_path == 'string' && options.thumb_path !== '') {
      let thumb = fs.createReadStream(options.thumb_path);
      formData.thumb = thumb;
    }
    if (typeof options.caption == 'string' && options.caption !== '') {
      formData.caption = options.caption;
    }

    let requestOptions = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: SendTG.getUrl() + "sendVideo",
      formData: formData,
      json: true
    }
    if (!requestOptions.formData.chat_id || !requestOptions.formData.video ){
      return false;
    }
    return new Promise((resolve, reject) => {
        request.post(requestOptions, (error, response, body) => {
            if (error) reject('No se ha podido enviar el video');
            else resolve(body);
        })

    }).catch(error => console.error('Ha habido un ERROR: ' , error));
  }

  static async sendImage(options) {
    let formData = {}
    if (options.type && options.chat_id){
      formData.chat_id = await SendTG.getChatId(options.type, options.chat_id);
    }

    if (typeof options.path == 'string' && options.path !== '') {
      let image = fs.createReadStream(options.path);
      formData.photo = image;
    }
    if (options.caption) {
      formData.caption = options.caption;
    }

    let requestOptions = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: SendTG.getUrl() + "sendPhoto",
      formData: formData,
      json: true
    }
    if (!requestOptions.formData.chat_id || !requestOptions.formData.photo) {
      return false;
    }
    return new Promise((resolve, reject) => {
      request.post(requestOptions, (error, response, body) => {
        if (error) reject('No se ha podido enviar la imagen');
        else resolve(body);
      })

    }).catch(error => console.error('Ha habido un ERROR: ', error));
  }

  static async sendText(options) {
    let formData = {}
    if (options.type && options.chat_id) {
      formData.chat_id = await SendTG.getChatId(options.type, options.chat_id);
    }

    if (options.text) {
      formData.text = options.text;
    }

    let requestOptions = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: SendTG.getUrl()  + "sendMessage",
      formData: formData,
      json: true
    };
    if (!requestOptions.formData.chat_id || !requestOptions.formData.text) {
      return false;
    }
    return new Promise((resolve, reject) => {
      request.post(requestOptions, (error, response, body) => {
        if (error) reject('No se ha podido enviar el texto');
        else resolve(body);
      });

    }).catch(error => console.error('Ha habido un ERROR: ', error));
  }

}

module.exports = SendTG;




