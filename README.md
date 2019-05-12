# Send telegram messages from the terminal easily with Node

Create your first Telegram Bot with [BotFather](https://telegram.me/botfather) for example. [Official Docs](https://core.telegram.org/bots)

Generate with BotFather your access token:

<img src="https://www.process.st/wp-content/uploads/2018/05/Snip20180510_37.png" height="250" title="Generate with BotFather your access token" alt="Generate with BotFather your access token" >



#### Clone the repository
```
git clone https://github.com/kiviev/sendTelegramCLI.git
```


#### Examples

For your use you have to execute the command in the terminal:

```
node /path/of/your/index.js -s user -i kiviev -t text -T "Hello word"

node index.js --sendto group -i test_kiviev -t image -p /home/user/Downloads/image.png -c "Hello word"
```

#### Enviroments Variables

Rename the file .env.sample to .env.

Replaces the value of  **TG_TOKEN** with the one that generated **Botfather**.

### Commands options

- -**s** or --**sendto**  \<*required*\>. Recipient of the message, options[user,group].
- -**i** or --**id**  \<*required*\>. User ID for example, @kiviev -> kiviev @kiviev_group -> kiviev_group.
- -**t** or --**type-msg** \<*required*\>. Type of message, options [text,image,video].
- -**p** or --**path** Path of the attachment. If you have chosen to send an image or video message will be \<*required*\>.
- -**T** or --**text** String to send. If text type has been chosen, it will be  \<*required*\>
- --**th** or --**thumbnail** [*optional*]. Path of thumbnail.
- -**c** or --**caption** [*optional*]. Caption to send (video or image type)
