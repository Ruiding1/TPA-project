'use strict';
// Manuscript tables: linear_time.tex and 1-shot_GPU.tex. Retain reported means.
const encoders = ['EVA-02','iBOT','SimMIM','BEiT','ResNet-50','ConvNeXt','Swin-T','MobileNetV3','EfficientNet'];
const results = {
  linear: {
    lgm: [85.2,83.4,94.5,94.9,88.7,94.2,94.8,80.2,85.1],
    tpa: [86.6,84.4,96.4,95.0,86.9,96.4,94.6,79.6,83.9],
    cdm: [88.6,87.7,98.6,95.6,91.4,97.3,96.0,88.3,87.4],
    means: [89.0,89.3,92.3], title: 'Linear-probing',
    description: 'Linear probing trains a classifier on frozen features of the distilled set.',
    image: 'assets/radar-linear.svg',
    reading: 'TPA-D gives a modest average gain over LGM-D; combining three teachers produces the larger transfer improvement. The single-teacher gains are not uniform across encoders.'
  },
  shot: {
    lgm: [80.4,84.1,88.5,92.8,61.5,85.0,83.4,73.2,77.7],
    tpa: [82.1,83.0,90.1,94.5,63.1,85.3,83.8,74.0,80.2],
    cdm: [86.5,88.1,93.8,93.9,81.2,89.5,88.5,84.2,89.4],
    means: [80.7,81.8,88.4], title: '1-shot',
    description: 'Training-free 1-shot inference uses the distilled images as class references.',
    image: 'assets/radar-1shot.svg',
    reading: 'TPA-CDM improves on LGM-D across all nine encoders in this table, with a reported mean gain of 7.7 percentage points. BEiT remains slightly higher with TPA-D than with TPA-CDM.'
  }
};
document.querySelectorAll('[data-protocol]').forEach(button => button.addEventListener('click', () => {
  const data = results[button.dataset.protocol];
  document.querySelectorAll('[data-protocol]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('results-body').innerHTML = encoders.map((name, i) => {
    const values = [data.lgm[i], data.tpa[i], data.cdm[i]];
    const best = Math.max(...values);
    return `<tr><th scope="row">${name}</th>${values.map(value => `<td${value === best ? ' class="best"' : ''}>${value.toFixed(1)}</td>`).join('')}</tr>`;
  }).join('');
  ['lgm','tpa','cdm'].forEach((name, i) => { document.getElementById(`mean-${name}`).textContent = data.means[i].toFixed(1); });
  document.getElementById('results-caption').textContent = `${data.title} accuracy (%) · ImageNet-100, IPC = 1`;
  document.getElementById('metric-description').textContent = data.description;
  const radar = document.getElementById('radar-image');
  radar.src = data.image;
  radar.alt = `Paper radar plot of ${data.title.toLowerCase()} accuracy across nine encoders.`;
  document.getElementById('result-reading').innerHTML = `<strong>What to notice.</strong> ${data.reading}`;
}));
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  const multi = button.dataset.gallery === 'cdm';
  const path = `assets/imagenet100-${multi ? 'cdm' : 'clip'}.png`;
  document.querySelectorAll('[data-gallery]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('gallery-image').src = path;
  document.getElementById('gallery-image').alt = `ImageNet-100 distilled image grid using ${multi ? 'CLIP, DINOv2 and MoCo-v3' : 'CLIP'}, one image per class.`;
  document.getElementById('gallery-link').href = path;
  document.getElementById('gallery-caption').innerHTML = multi
    ? '<strong>CLIP + DINOv2 + MoCo-v3.</strong> One shared set contains 100 synthetic images, one for each ImageNet-100 class. Compare with the CLIP-only set to inspect how teacher choice changes the synthesized appearance.'
    : '<strong>CLIP only.</strong> The same dataset and image budget with a single synthesis teacher. Inspect changes in texture and class appearance; visual quality alone does not establish transfer performance.';
}));
