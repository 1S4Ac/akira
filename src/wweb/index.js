const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const { getSynonymes, contains, normalize, isVerb } = require('./utils/words');
const { isAllowed } = require('./utils/permissions');

const capitalize = require('capitalize');
const { Report } = require('../schema/Report');
const { User } = require('../schema/User');

const client = new Client({
  authStrategy: new LocalAuth(),
});

const commands = [
  '!reportar',
  '!listar',
  '!sinonimos',
  '!comandos',
  '!sticker',
  '!users',
];

const saudations = [
  'ola',
  'oi',
  'bom dia',
  'boa tarde',
  'boa noite',
  'eae',
  'oie',
  'eai',
];

const love = ['te amo', 'amo vc', 'amo voce', 'amo tu'];

const allowedContacts = [
  '554788084750',
  '554799757118',
  '554789131937',
  '554788399119',
  '554797892504',
];

const girl = ['mulher', 'madame', 'dama', 'senhorita'];

const reaction = {
  verifiyng: '🚀',
  success: '👍🏻',
  fail: '🚫',
  loading: '⏳',
  doubt: '🤔',
};

const start = async () => {
  console.log('starting wweb service');
  try {
    client.on('qr', (qr) => {
      console.log('QR Code');
      qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
      console.log(session);
      console.log('User authenticated successfully🧑‍🚀');
    });

    client.on('auth_failure', (error) => {
      console.log('auth failure', error);
    });

    client.on('ready', async () => {
      console.log('Client is ready to zap!🚀');
    });

    client.on('message', async (message) => {
      const args = normalize(message.body.toLowerCase());
      const chat = await message.getChat();
      const contact = await message.getContact();
      const messages = await chat.fetchMessages();

      if (message.type == 'chat') {
        const message_log = {
          from: contact.name ? contact.name : contact.pushname,
          message: message.body,
        };
        console.log(message_log);
      }

      if (!isAllowed(allowedContacts, contact.number)) {
        return;
      }

      if (args.includes('!')) {
        let arguments = args.split(' ');

        if (!commands.includes(arguments[0])) {
          message.react(reaction.doubt);
          chat.sendMessage(
            'Comando não encontrado, por gentileza verifique se você está digitando corretamente.'
          );
        }

        if (args == '!comandos') {
          message.react('🚑');
          message.reply(`Lista de comandos do Akira:
          ${commands.map((c) => {
            return `\r\n${c}`;
          })}
          `);
        }

        if (args.includes('!sinonimos')) {
          let arguments = args.split(' ');
          if (arguments.length > 2) {
            chat.sendMessage(
              'Você deve informar somente uma palavra para buscar seus sinônimos.'
            );
          }
          var synonymes = await getSynonymes(arguments[1]);
          synonymes[0] = capitalize(synonymes[0]);
          chat.sendMessage(synonymes.join(', '));
        }

        if (args.includes('!reportar')) {
          const { body } = message;
          console.log(body);

          let media = message.hasMedia
            ? await message.downloadMedia()
            : undefined;
          if (message.hasMedia && media == undefined) {
            chat.sendMessage(
              'Arquivo não suportado ou removido do seu aparelho.'
            );
          }
          try {
            const report = new Report({
              attachment: media.filename,
              assignedTo: message.to,
              createdBy: message.from,
              description: text,
              title: title,
            });

            const saved = await report.save();

            if (saved) {
              message.react(reaction.success);
              chat.sendMessage(
                'Report cadastrado com sucesso... Nossa equipe irá dar o máximo para atender sua solicitação o quanto antes!'
              );
            }
          } catch (err) {
            message.react(reaction.fail);
            chat.sendMessage(
              'Ocorreu um erro ao iniciar o seu report.' + err.message
            );
          }
        }

        if (args == '!sticker') {
          if (!message.hasMedia) {
            chat.sendMessage(
              'Você deve anexar uma imagem para solicitar o sticker.'
            );
          }
          chat.sendMessage('Gerando sticker...');
          const sticker = await message.downloadMedia();
          if (sticker) {
            chat.sendMessage(sticker, { sendMediaAsSticker: true });
          } else {
            chat.sendMessage('Não foi possível stickar sua imagem.');
          }
        }

        if (args == '!users') {
          try {
            const users = await User.find();
            console.log({ users });

            if (users.length > 0) {
              chat.sendMessage('Carregando lista de usuários...');
              users.map((u) => {
                chat.sendMessage(`
                \r\nUsuário: ${u.username}
                \r\nNome completo: ${u.firstName + ` ` + u.lastName}
                \r\nWhatsapp: ${u.phone}
                \r\nEmail: ${u.email}
                `);
              });
            } else {
              chat.sendMessage('Nenhum usuário cadastrado.');
            }
          } catch (err) {
            console.log(err);
            message.react(reaction.fail);
            chat.sendMessage(
              'Não foi possível listar os usuários, reclame com o *ISAÍAS* 🤡'
            );
          }
        }
      } else {
        if (contains(saudations, args)) {
          const synonymes = await getSynonymes(message.body);
          const randomResponse =
            synonymes.length > 0
              ? synonymes[Math.floor(Math.random() * synonymes.length)]
              : 'Olá';

          chat.sendMessage(
            capitalize(randomResponse) +
              ', me chamo Akira, no que posso te ajudar? Caso não saiba como interagir comigo, digite *!comandos*.'
          );

          console.log(synonymes);
        }
      }

      if (love.includes(args)) {
        setTimeout(async () => {
          await chat.sendSeen();
          await chat.sendStateTyping();
          setTimeout(async () => {
            await chat.sendSeen();
            setTimeout(async () => {
              const adjetivos = await getSynonymes('rainha');
              chat.sendMessage(
                capitalize(love[Math.floor(Math.random() * love.length)]) +
                  ' ' +
                  'minha ' +
                  adjetivos[Math.floor(Math.random() * adjetivos.length)]
              );
              chat.sendMessage('❤❤');
              await chat.clearState();
            }, 1000);
          }, 3000);
        }, 5000);
      }
    });

    client.initialize();
  } catch (err) {
    console.log("couldn't connect to whatsapp service.", err);
  }
};

const report = async (media, message, chat) => {
  chat.sendMessage('Bem vindo(a) a Central de Reports Collabo');
};

const list = () => {};

module.exports = { start };
