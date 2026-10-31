# TPA project page

Public-facing static page for Temporal Prototype Alignment for Frozen-Feature
Dataset Distillation. This repository contains website assets only. The method
implementation remains in a separate private repository.

Published with GitHub Pages from the main branch. Paper results shown here are
reported manuscript results, not a newly reproduced benchmark. Code and
checkpoint links will be added after verification and author approval.

## Figure and result provenance

The figures are exported from the authors' manuscript: `main_model.pdf`,
`time.pdf`, `radar_linear.pdf`, `radar_1shot.pdf`, and the ImageNet-100,
Flowers-102 and Food-101 synthetic-image grids. The method and plots retain
vector paths. Table values come from `linear_time.tex` and `1-shot_GPU.tex`;
reported means are preserved rather than recomputed from rounded entries.

The efficiency comparison uses the reported configurations: LGM on four
RTX 4090 GPUs and TPA on one RTX 4090. It is not a same-hardware timing study.

The project URL is fixed at https://ruiding1.github.io/TPA-project/ so printed
poster QR codes remain valid. The poster PDF is landscape, 1400 × 900 mm.
This website does not contain implementation sources, checkpoints, server
connection details, or the unfinished camera-ready manuscript.
