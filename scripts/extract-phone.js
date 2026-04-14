const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'hf_20260410_094220_669317af-37a3-455e-b975-8cfb9dda9d6f.png');
const out = path.join(__dirname, '..', 'public', 'cases', 'aktivhelse-mobile.png');

async function run() {
  const meta = await sharp(src).metadata();
  console.log(`Source: ${meta.width} x ${meta.height}`);
  
  // Fine-tuned phone screen coordinates
  // Tighten: more left, more top, less width, less height to exclude frame
  const left = Math.round(meta.width * 0.78);
  const top = Math.round(meta.height * 0.25);
  const width = Math.round(meta.width * 0.165);
  const height = Math.round(meta.height * 0.585); // exclude phone frame at bottom
  
  console.log(`Cropping: left=${left} top=${top} width=${width} height=${height}`);
  
  await sharp(src)
    .extract({ left, top, width, height })
    .toFile(out);
    
  const outMeta = await sharp(out).metadata();
  console.log(`Output: ${outMeta.width} x ${outMeta.height} (ratio: ${(outMeta.width/outMeta.height).toFixed(3)})`);
  console.log('Done!');
}

run().catch(console.error);
