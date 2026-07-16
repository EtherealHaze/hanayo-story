#!/usr/bin/env python3
"""批量生成 MP3 音频 — 调用 edge-tts (微软 Xiaoxiao 神经语音)"""

import subprocess, json, os, sys, asyncio
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO_DIR = ROOT / 'assets' / 'audio'

async def generate_all():
    # 1. 用 Node 导出文本列表
    result = subprocess.run(
        ['node', 'scripts/export_texts.js'],
        capture_output=True, text=True, cwd=str(ROOT),
        encoding='utf-8', errors='replace'
    )
    # stdout 第一行是 JSON 数组（后续文本可能是 Node 的 stderr 混入）
    raw = result.stdout.strip()
    # 取 JSON 数组部分（从第一个 [ 到最后一个 ]）
    start = raw.find('[')
    end = raw.rfind(']')
    if start == -1 or end == -1:
        print(f"❌ 无法解析 Node 输出: {raw[:200]}")
        sys.exit(1)
    items = json.loads(raw[start:end+1])
    print(f"📝 共 {len(items)} 段文本待生成")

    # 2. 并发生成（限制 3 并发）
    sem = asyncio.Semaphore(3)
    
    async def gen_one(item):
        async with sem:
            out_path = AUDIO_DIR / item['file']
            if out_path.exists():
                print(f"  ⏭ 跳过(已存在): {item['file']}")
                return
            voice = item.get('voice', 'zh-CN-XiaoxiaoNeural')
            rate = item.get('rate', '-10%')
            text = item['text']
            
            try:
                proc = await asyncio.create_subprocess_exec(
                    'edge-tts',
                    '--voice', voice,
                    '--rate', rate,
                    '--text', text,
                    '--write-media', str(out_path),
                    stdout=asyncio.subprocess.DEVNULL,
                    stderr=asyncio.subprocess.PIPE,
                )
                _, stderr = await proc.communicate()
                if proc.returncode == 0:
                    size = out_path.stat().st_size
                    print(f"  ✅ {item['file']} ({size//1024}KB)")
                else:
                    err = stderr.decode()[:100] if stderr else 'unknown'
                    print(f"  ❌ {item['file']}: {err}")
            except Exception as e:
                print(f"  ❌ {item['file']}: {e}")

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    tasks = [gen_one(it) for it in items]
    await asyncio.gather(*tasks)

    # 3. 统计
    total_size = sum(f.stat().st_size for f in AUDIO_DIR.glob('*.mp3'))
    print(f"\n🎉 完成！{len(list(AUDIO_DIR.glob('*.mp3')))} 个文件，共 {total_size//1024}KB ({total_size/1024/1024:.1f}MB)")

if __name__ == '__main__':
    asyncio.run(generate_all())
