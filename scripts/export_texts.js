// 导出所有需要 TTS 朗读的文本段落
// 用于 edge-tts 批量生成 MP3

const fs = require('fs');

// 加载 stories（浏览器模块 → 简单包装）
const script = fs.readFileSync('stories.js', 'utf8');
const storiesCode = script.replace('const SAMPLE_STORIES', 'globalThis.SAMPLE_STORIES');
eval(storiesCode);

const items = [];

SAMPLE_STORIES.forEach(story => {
  // 每页故事文字
  story.pages.forEach((p, i) => {
    items.push({
      file: `${story.id}_p${i}.mp3`,
      text: p.text,
      voice: 'zh-CN-XiaoxiaoNeural',
      rate: '-10%',
    });
  });

  // 引导问题
  story.guideQuestions.forEach((q, i) => {
    items.push({
      file: `${story.id}_qintro_${i}.mp3`,
      text: q.text,
      voice: 'zh-CN-XiaoxiaoNeural',
      rate: '-5%',
    });
  });

  // 问答反馈
  story.quizQuestions.forEach((q, i) => {
    if (q.good) {
      items.push({
        file: `${story.id}_qgood_${i}.mp3`,
        text: q.good,
        voice: 'zh-CN-XiaoxiaoNeural',
        rate: '-5%',
      });
    }
    if (q.hint) {
      items.push({
        file: `${story.id}_qhint_${i}.mp3`,
        text: q.hint,
        voice: 'zh-CN-XiaoxiaoNeural',
        rate: '-5%',
      });
    }
  });

  // 小结鼓励语
  const encMsg = '全部答对啦！你真是太厉害了！每个知识点都记住啦！';
  items.push({
    file: `${story.id}_summary_perfect.mp3`,
    text: encMsg,
    voice: 'zh-CN-XiaoxiaoNeural',
    rate: '-5%',
  });
  items.push({
    file: `${story.id}_summary_good.mp3`,
    text: '答得真好！大部分题都做对了，继续加油哦！',
    voice: 'zh-CN-XiaoxiaoNeural',
    rate: '-5%',
  });
  items.push({
    file: `${story.id}_summary_ok.mp3`,
    text: '今天学得很认真呢！再来一次一定会做得更好～',
    voice: 'zh-CN-XiaoxiaoNeural',
    rate: '-5%',
  });
});

// 去重（基于 file 名）
const seen = new Set();
const unique = items.filter(item => {
  if (seen.has(item.file)) return false;
  seen.add(item.file);
  return true;
});

console.log(JSON.stringify(unique, null, 2));
console.error(`Total: ${unique.length} audio segments`);
