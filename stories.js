// 花音故事 — 示例故事库
// 部编版一年级语文知识点自然融入

// ===== 故事1：小兔子的新朋友 =====
const story1 = {
  id: 'rabbit_friend',
  title: '小兔子的新朋友',
  coverEmoji: '🐰',
  coverColor: '#FFF3E0',
  description: '一只小兔子在森林里交到了新朋友，发现大家虽然不一样，却能一起快乐玩耍～',
  tagTypes: ['反义词', '量词', '比喻句', '又X又X'],
  guideQuestions: [
    { text: '🤔 小兔子一路上遇到了哪些动物朋友呢？' },
    { text: '🤔 为什么小乌龟走得慢，却很开心呢？' },
    { text: '🤔 你觉得"大"和"小"是一对什么样的词呢？' },
  ],
  pages: [
    {
      text: '在一片绿绿的森林里，住着一只雪白雪白的小兔子。\n它的毛像棉花糖一样柔软，眼睛像两颗红宝石。',
      emoji: '🌲🐰🌲', bgColor: '#E8F5E9', kpIds: ['kp_liangci_zhi', 'kp_biyu']
    },
    {
      text: '一天早晨，小兔子蹦蹦跳跳地出门了。\n它来到一条弯弯的小河边，河水哗啦啦地唱着歌。',
      emoji: '🏞️🐰', bgColor: '#E3F2FD', kpIds: ['kp_liangci_tiao']
    },
    {
      text: '"你好呀！"一个又大又圆的乌龟壳从水里冒了出来。\n原来是小乌龟！小兔子高兴极了。',
      emoji: '🐢💬🐰', bgColor: '#F3E5F5', kpIds: ['kp_liangci_ge', 'kp_youx_youx']
    },
    {
      text: '小兔子说："我们比赛跑步吧！" 小乌龟笑了笑，慢慢地爬着。\n小兔子跑得快，小乌龟爬得慢——可是它们都笑得很开心。',
      emoji: '🏃🐰🐢', bgColor: '#FFF9C4', kpIds: ['kp_fanyi_kuaiman']
    },
    {
      text: '"快和慢"是一对反义词哦，就像"大和小"一样，意思正好相反呢！\n过了一会儿，一只小鸟飞了过来。',
      emoji: '🐦✨', bgColor: '#FFECB3', kpIds: ['kp_fanyi_kuaiman', 'kp_fanyi_daxiao']
    },
    {
      text: '小鸟的歌声像铃铛一样清脆动听。\n三个新朋友坐在河边，吃着又香又甜的野果，开心极了！',
      emoji: '🐰🐢🐦🍎', bgColor: '#FFCCBC', kpIds: ['kp_biyu', 'kp_youx_youx']
    },
    {
      text: '太阳公公要下山了，三个好朋友约好明天再见面。\n不一样的朋友，也能成为最好的伙伴呀！🌈',
      emoji: '🌅👋', bgColor: '#FFE0B2', kpIds: []
    },
  ],
  quizQuestions: [
    {
      id: 'q1_1', question: '小兔子先后遇到了哪些小动物？',
      options: ['🐢 乌龟和🐦 小鸟', '🐿️ 松鼠和🐸 青蛙', '🐱 小猫和🐶 小狗', '🐟 小鱼和🦋 蝴蝶'],
      correct: 0,
      good: '太棒了！你听得真仔细！没错，小兔子遇到了乌龟和小鸟～⭐',
      hint: '再想想哦～第一个从水里冒出来的是谁呀？后来谁从天上飞来了？',
      kp: '听故事的时候，注意记住出现的小动物，这样就能回答「故事里都有谁」啦！',
      kpId: 'kp_fanyi_kuaiman'
    },
    {
      id: 'q1_2', question: '"快"的反义词是什么？',
      options: ['慢', '跑', '远', '近'],
      correct: 0,
      good: '对了！快和慢是一对反义词，真聪明！🎉',
      hint: '小兔子跑得很___，小乌龟爬得很___。想想故事里是怎么说的？',
      kp: '反义词就是意思相反的词。比如"快"和"慢"、"大"和"小"，都是反义词哦～',
      kpId: 'kp_fanyi_kuaiman'
    },
    {
      id: 'q1_3', question: '下面哪个是"又X又X"的词语呢？',
      options: ['又大又圆', '高高兴兴', '一只小鸟', '跑得快'],
      correct: 0,
      good: '没错！"又大又圆"就是又X又X的词语～🌟',
      hint: '小提醒：又X又X式词语中间有两个相同的"又"字哦～比如故事里的"又大又圆"、"又香又甜"！',
      kp: '"又X又X"式词语用两个"又"把两个特点连在一起，让描述更生动！比如：又大又红、又香又甜、又快又好～',
      kpId: 'kp_youx_youx'
    },
    {
      id: 'q1_4', question: '故事里说小兔子的毛像什么？',
      options: ['像棉花糖', '像雪花', '像云朵', '像豆腐'],
      correct: 0,
      good: '真棒！"像棉花糖一样柔软"——这就是比喻句哦！✨',
      hint: '故事开头说小兔子的毛像什么一样柔软呀？白白的、软软的～',
      kp: '比喻句就是用"像"把一个东西比作另一个东西。比如"明亮的眼睛像星星"，让句子更好听！',
      kpId: 'kp_biyu'
    },
  ],
  knowledgePoints: [
    { id: 'kp_liangci_zhi', type: '量词', title: '一只', typeColor: '#2196F3',
      explanation: '"只"是用来数小动物的量词。比如：一只兔子、一只小鸟、一只乌龟。',
      examples: ['一只小猫', '一只蝴蝶', '一只青蛙'] },
    { id: 'kp_liangci_tiao', type: '量词', title: '一条', typeColor: '#2196F3',
      explanation: '"条"是用来数长长的东西的量词。比如：一条河、一条路、一条鱼。',
      examples: ['一条围巾', '一条绳子', '一条蛇'] },
    { id: 'kp_liangci_ge', type: '量词', title: '一个', typeColor: '#2196F3',
      explanation: '"个"是最常用的量词。比如：一个朋友、一个苹果、一个故事。',
      examples: ['一个太阳', '一个月亮', '一个书包'] },
    { id: 'kp_fanyi_kuaiman', type: '反义词', title: '快 ↔ 慢', typeColor: '#E91E63',
      explanation: '快和慢是反义词。快就是速度高，慢就是速度低，它们的意思正好相反。',
      examples: ['汽车开得快，蚂蚁爬得慢', '兔跑得快，龟爬得慢'] },
    { id: 'kp_fanyi_daxiao', type: '反义词', title: '大 ↔ 小', typeColor: '#E91E63',
      explanation: '大和小是反义词。大象很大，蚂蚁很小，它们的体型正好相反。',
      examples: ['大象大，老鼠小', '西瓜大，樱桃小'] },
    { id: 'kp_youx_youx', type: '又X又X', title: '又大又圆', typeColor: '#FF9800',
      explanation: '"又X又X"式词语把两个特点连在一起说，让描述更丰富生动。',
      examples: ['又大又红', '又香又甜', '又快又好', '又白又胖'] },
    { id: 'kp_biyu', type: '比喻句', title: '像……一样', typeColor: '#00BCD4',
      explanation: '比喻句用"像"把一个人或东西比作另一个人或东西，让句子变得更生动。',
      examples: ['月亮像小船', '星星像眼睛', '笑声像铃铛'] },
  ],
};

// ===== 故事2：月亮姐姐的礼物 =====
const story2 = {
  id: 'moon_gift',
  title: '月亮姐姐的礼物',
  coverEmoji: '🌙',
  coverColor: '#E8EAF6',
  description: '月亮姐姐给森林里的小动物们送来了神秘礼物，小动物们高高兴兴地打开后发现了惊喜～',
  tagTypes: ['形近字', '多音字', 'AABB叠词', '关联词'],
  guideQuestions: [
    { text: '🤔 月亮姐姐送来了什么样的礼物呢？' },
    { text: '🤔 小动物们打开礼物后，心情怎么样？' },
    { text: '🤔 你觉得"大"和"太"这两个字长得像不像？它们哪里不一样？' },
  ],
  pages: [
    {
      text: '中秋节到了，月亮姐姐高高兴兴地挂在天上，\n她的脸庞又圆又亮，笑眯眯地看着大地。',
      emoji: '🌙✨🌃', bgColor: '#1A237E', kpIds: ['kp_aabb_ggxx', 'kp_youx_youx2']
    },
    {
      text: '"送给森林里的小朋友们一些礼物吧！"月亮姐姐轻轻一挥手，\n天空中飘下来好多闪闪发光的星星盒子。',
      emoji: '🎁⭐🌲', bgColor: '#283593', kpIds: []
    },
    {
      text: '小松鼠发现了树上挂着的一个盒子，\n上面写着："给我最爱的小松鼠——月亮姐姐"。',
      emoji: '🐿️🎁', bgColor: '#4CAF50', kpIds: ['kp_liangci_ge2']
    },
    {
      text: '小松鼠小心地打开盒子——哇！是一根长长（cháng cháng）的围巾！\n"因为冬天快到了，所以你需要暖暖的围巾哦～"',
      emoji: '🧣🐿️', bgColor: '#FF5722', kpIds: ['kp_duoyin_chang', 'kp_guanlian_yinsuoyi']
    },
    {
      text: '小兔子也找到了自己的礼物——是一颗神奇的种子！\n月亮姐姐说："种下去，它会长（zhǎng）成一棵大树哦。"\n注意哦：cháng 长是长短，zhǎng 长是长大，读法不一样呢！',
      emoji: '🌱🐰', bgColor: '#8BC34A', kpIds: ['kp_duoyin_chang', 'kp_xingjin_datai']
    },
    {
      text: '小兔子把种子埋进土里。虽然种子很小很小，但是会长成一棵大树！\n等一下——"大"和"太"长得真像呀！大字下面空空的，太字下面多了一个小点点。',
      emoji: '🔍📝', bgColor: '#FFF176', kpIds: ['kp_xingjin_datai']
    },
    {
      text: '小动物们安安静静地看着月亮姐姐，心里暖暖和和的。\n"谢谢月亮姐姐！因为有你们，所以我们这个中秋节过得特别开心！"',
      emoji: '🐿️🐰🐻🌙', bgColor: '#FFCC80', kpIds: ['kp_aabb_ggxx', 'kp_guanlian_yinsuoyi']
    },
  ],
  quizQuestions: [
    {
      id: 'q2_1', question: '月亮姐姐给小松鼠送了什么礼物？',
      options: ['一条长长的围巾', '一颗神奇的种子', '一个星星盒子', '一顶帽子'],
      correct: 0,
      good: '答对了！一条长长的围巾，你记得真清楚！🧣⭐',
      hint: '再想想哦～小松鼠收到的礼物是和冬天有关的，可以保暖的～',
      kp: '', kpId: 'kp_duoyin_chang'
    },
    {
      id: 'q2_2', question: '"大"和"太"这两个字哪里不一样？',
      options: ['"太"下面多了一个点', '"大"下面多了一横', '"太"左边多了一撇', '"大"和"太"完全一样'],
      correct: 0,
      good: '太厉害了！"太"字就是"大"字下面加了一个小点点～🔍',
      hint: '仔细看看："大"字下面是空空的，"太"字下面有没有多什么东西呀？',
      kp: '形近字就是长得很像的字。"大"和"太"只差一个小点点，写的时候要仔细哦！类似的还有"人"和"入"～',
      kpId: 'kp_xingjin_datai'
    },
    {
      id: 'q2_3', question: '"长"在故事里有两个读音，cháng 和 zhǎng。下面哪句话里的"长"读 zhǎng？',
      options: ['种子会长成一棵大树', '一条长长的围巾', '这条路很长', '长长的头发'],
      correct: 0,
      good: '正确！"长大"的"长"读 zhǎng，"长短"的"长"读 cháng～🌟',
      hint: '小提示：当"长"表示"长大、生长"的时候读 zhǎng，表示"长短"的时候读 cháng 哦～',
      kp: '多音字就是一个字有多个读音。"长"可以读 cháng（长短），也可以读 zhǎng（长大）。读音不同，意思也不同！',
      kpId: 'kp_duoyin_chang'
    },
    {
      id: 'q2_4', question: '故事里出现了哪些 AABB 式的词语？',
      options: ['高高兴兴、安安静静', '又大又圆、又香又甜', '快和慢、大和小', '月亮、星星'],
      correct: 0,
      good: '太棒了！高高兴兴、安安静静都是 AABB 式叠词！👏',
      hint: 'AABB 式词语就是前面两个字一样，后面两个字也一样的词，比如"高高兴兴"、"开开心心"～',
      kp: 'AABB 式叠词把字重复使用，让词语更有节奏感！比如：高高兴兴、开开心心、干干净净、整整齐齐。',
      kpId: 'kp_aabb_ggxx'
    },
  ],
  knowledgePoints: [
    { id: 'kp_aabb_ggxx', type: 'AABB叠词', title: '高高兴兴', typeColor: '#4CAF50',
      explanation: 'AABB 式叠词把同一个字重复两次，让词语更有节奏感，读起来朗朗上口。',
      examples: ['高高兴兴', '开开心心', '安安静静', '暖暖和和', '干干净净'] },
    { id: 'kp_duoyin_chang', type: '多音字', title: '长：cháng / zhǎng', typeColor: '#9C27B0',
      explanation: '"长"是个多音字。读 cháng 时表示长短，比如"长长的围巾"；读 zhǎng 时表示长大、生长，比如"长大"。',
      examples: ['cháng：长长的、长短', 'zhǎng：长大、长高、生长'] },
    { id: 'kp_xingjin_datai', type: '形近字', title: '大 ↔ 太', typeColor: '#FF5722',
      explanation: '"大"和"太"是形近字，长得非常像！"大"字下面空空的，"太"字下面多了一个小点点。写的时候要注意哦！',
      examples: ['大象很大', '太阳出来了'] },
    { id: 'kp_guanlian_yinsuoyi', type: '关联词', title: '因为……所以……', typeColor: '#795548',
      explanation: '"因为...所以..."是一组关联词，用来表示原因和结果。前面的"因为"说原因，后面的"所以"说结果。',
      examples: ['因为下雨了，所以我们带伞。', '因为小兔子很努力，所以它学会了跑步。'] },
    { id: 'kp_youx_youx2', type: '又X又X', title: '又圆又亮', typeColor: '#FF9800',
      explanation: '"又X又X"式词语把两个特点连在一起说。故事里月亮姐姐"又圆又亮"，同时说了两个特点！',
      examples: ['又圆又亮', '又大又红', '又香又甜', '又高又壮'] },
    { id: 'kp_liangci_ge2', type: '量词', title: '一个', typeColor: '#2196F3',
      explanation: '"个"是最常用的量词之一，可以数很多很多东西。',
      examples: ['一个盒子', '一个苹果', '一个礼物'] },
  ],
};

const SAMPLE_STORIES = [story1, story2];
