const {GuildMember} = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Change the volume!',
  description: '更改音量大小',
  options: [
    {
      //name: 'volume',
      name: '音量',
      type: 4, // 'INTEGER' Type
      // description: 'Number between 0-200',
      description: '在0-200之间的数字',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        // content: 'You are not in a voice channel!',
        content: '⚠️ | 你不在一个语音频道里！',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        // content: 'You are not in my voice channel!',
        content: '⚠️ | 你不在我所在的语音频道里!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      /* return void interaction.followUp({
        content: '❌ | No music is being played!'
      }); */
      return void interaction.followUp({
        content: '❌ | 没有音乐在播放！'
      });

    var 音量 = interaction.options.get('音量').value;
    音量 = Math.max(0, 音量);
    音量 = Math.min(200, 音量);
    const success = queue.setVolume(音量);

    return void interaction.followUp({
      // content: success ? `🔊 | Volume set to ${volume}!` : '❌ | Something went wrong!',
      content: success ? `🔊 | 音量设置为  ${音量}!` : '❌ | 出了点问题！',
    });
  },
};
