import type { Publication } from '@/types'

// Source of truth: _pages/about.md (working tree). Ordering preserved.
// `focus`/`goal` come from the PAPER_TAGS table; `venueGroup` from VENUE_MAP.
// The three papers that linked to missing ../files/*.pdf have those links dropped.
export const publications: Publication[] = [
  {
    id: 'pub-interpret-agent-behavior',
    title: 'How to Interpret Agent Behavior',
    url: 'https://arxiv.org/abs/2605.13625',
    authors:
      'Jie Gao, Kaiser Sun, Jen-tse Huang, Katherine Van Koevering, Sijie Ji, Heyuan Huang, Weiyan Shi, **Zhuoran Lu**#, Ziang Xiao, Daniel Khashabi, and Mark Dredze.',
    venue: 'arXiv',
    venueGroup: 'preprint',
    venueFull: 'Preprint, 2026.',
    year: 2026,
    focus: 'cognition',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2605.13625' }],
  },
  {
    id: 'pub-autoredtrader',
    title:
      'AutoRedTrader: Autonomous Red Teaming of Trading Agents through Synthetic Misinformation Injection',
    url: 'https://arxiv.org/abs/2605.09185',
    authors:
      'Zhiwei Liu, Yangyang Yu, Yupeng Cao, Yuechen Jiang, Haohang Li, **Zhuoran Lu**#, Yuyan Wang, Yixiang Zheng, Xiaorui Guo, Calvin Yixiang Cheng, and Sophia Ananiadou.',
    venue: 'arXiv',
    venueGroup: 'preprint',
    venueFull: 'Preprint, 2026.',
    year: 2026,
    focus: 'social',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2605.09185' }],
  },
  {
    id: 'pub-tracing-genai-art',
    title:
      "Tracing Generative AI in Digital Art: A Longitudinal Study of Chinese Painters' Attitudes, Practices, and Identity Negotiation",
    url: 'https://arxiv.org/abs/2511.03117',
    authors: 'Yibo Meng, Ruiqi Chen, **Zhuoran Lu**#, Shuai Ma, and Chengxi Zang.',
    venue: 'arXiv',
    venueGroup: 'preprint',
    venueFull: 'Preprint, 2025.',
    year: 2025,
    focus: 'social',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2511.03117' }],
  },
  {
    id: 'pub-llm-adversarial-risks-interventions',
    title:
      'Large Language Model (LLM)-driven Adversarial Social Influences in Online Information Spread: Risks and Interventions.',
    url: 'https://doi.org/10.1145/3772318.3790442',
    authors: '**Zhuoran Lu**\\*, Gionnieve Lim\\*, and Ming Yin.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 44th ACM Conference on Human Factors in Computing Systems (CHI), Barcelona, May 2026.',
    year: 2026,
    focus: 'social',
    goal: ['understanding', 'designing'],
    links: [{ label: 'PDF', url: 'https://doi.org/10.1145/3772318.3790442' }],
  },
  {
    id: 'pub-human-llm-feature-engineering',
    title: 'Human-LLM Collaborative Feature Engineering for Tabular Data',
    url: 'https://arxiv.org/abs/2601.21060',
    authors:
      'Zhuoyan Li, Aditya Bansal, Jinzhao Li, Shishuang He, **Zhuoran Lu**, Mutian Zhang, Qin Liu, Yiwei Yang, Swati Jain, Ming Yin, and Yunyao Li.',
    venue: 'ICLR',
    venueGroup: 'ai',
    venueFull:
      'The Fourteenth International Conference on Learning Representations (ICLR), Rio de Janeiro, April 2026.',
    year: 2026,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2601.21060' }],
  },
  {
    id: 'pub-from-text-to-trust',
    title:
      'From Text to Trust: Empowering AI-assisted Decision Making with Adaptive LLM-powered Analysis',
    url: 'https://dl.acm.org/doi/10.1145/3706598.3713133',
    authors: 'Zhuoyan Li, Hangxiao Zhu, **Zhuoran Lu**, Ziang Xiao, and Ming Yin.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.',
    year: 2025,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3706598.3713133' }],
  },
  {
    id: 'pub-credibility-peers-experts',
    title:
      'Understanding the Effects of AI-based Credibility Indicators When People Are Influenced By Both Peers and Experts',
    url: 'https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/CHI25/784/5b747fc9-da77-11ef-ada9-16bb50361d1f/OUT/chi25-784.html/',
    authors: '**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.',
    year: 2025,
    focus: 'social',
    goal: 'understanding',
    links: [
      {
        label: 'PDF',
        url: 'https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/CHI25/784/5b747fc9-da77-11ef-ada9-16bb50361d1f/OUT/chi25-784.html/',
      },
    ],
  },
  {
    id: 'pub-whatelse',
    title:
      'WhatELSE: Shaping Narrative Space at Configurable Level of Abstraction for AI-bridged Interactive Storytelling.',
    url: 'https://arxiv.org/abs/2502.18641',
    authors: '**Zhuoran Lu**, Qian Zhou, and Yi Wang.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.',
    year: 2025,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2502.18641' }],
  },
  {
    id: 'pub-llm-adversarial-lbw',
    title:
      'Understanding the Effects of Large Language Model (LLM)-driven Adversarial Social Influences in Online Information Spread.',
    url: 'https://dl.acm.org/doi/full/10.1145/3706599.3720019',
    authors: '**Zhuoran Lu**\\*, Gionnieve Lim\\*, and Ming Yin.',
    venue: 'CHI-LBW',
    venueGroup: 'hci',
    venueFull:
      'Late-Breaking Work (LBW) of the 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.',
    year: 2025,
    focus: 'social',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/full/10.1145/3706599.3720019' }],
  },
  {
    id: 'pub-does-more-advice-help',
    title:
      'Does More Advice Help? The Effects of Second Opinions in AI-Assisted Decision Making',
    url: 'https://dl.acm.org/doi/10.1145/3653708',
    authors: '**Zhuoran Lu**, Dakuo Wang, and Ming Yin.',
    venue: 'CSCW',
    venueGroup: 'hci',
    venueFull:
      'The 27th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), San José, November 2024.',
    prelim:
      'Preliminary version in the CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023.',
    year: 2024,
    focus: 'social',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3653708' }],
  },
  {
    id: 'pub-pearl',
    title:
      'PEARL: Personalizing Large Language Model Writing Assistants with Generation-Calibrated Retrievers',
    url: 'https://arxiv.org/abs/2311.09180',
    authors:
      'Sheshera Mysore, **Zhuoran Lu**, Mengting Wan, Longqi Yang, Steve Menezes, Tina Baghaee, Emmanuel Barajas Gonzalez, Jennifer Neville, Tara Safavi.',
    venue: '',
    venueGroup: 'other',
    venueFull: 'EMNLP Workshop on Customizable NLP (CustomNLP4U), Miami, November 2024.',
    year: 2024,
    focus: 'cognition',
    goal: 'designing',
    links: [],
  },
  {
    id: 'pub-mix-and-match',
    title:
      'Mix and Match: Characterizing Heterogeneous Human Behavior in AI-assisted Decision Making',
    url: 'https://ojs.aaai.org/index.php/HCOMP/article/view/31604',
    authors: '**Zhuoran Lu**, Hasan Amin, Zhuoyan Li, and Ming Yin.',
    venue: 'HCOMP',
    venueGroup: 'hci',
    venueFull:
      'The 12th AAAI Conference on Human Computation and Crowdsourcing (HCOMP), Pittsburgh, October 2024.',
    year: 2024,
    focus: 'cognition',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://ojs.aaai.org/index.php/HCOMP/article/view/31604' }],
  },
  {
    id: 'pub-behavior-aware-ai',
    title:
      'Designing Behavior-Aware AI to Improve the Human-AI Team Performance in AI-Assisted Decision Making',
    url: 'https://www.ijcai.org/proceedings/2024/344',
    authors: '**Zhuoran Lu**\\*, Hasan Amin\\*, and Ming Yin.',
    venue: 'IJCAI',
    venueGroup: 'ai',
    venueFull:
      'The 33th International Joint Conference on Artificial Intelligence (IJCAI), Jeju, August 2024.',
    prelim:
      'Preliminary version in the ICML Workshop on Artificial Intelligence & Human Computer Interaction (AI HCI), Hawaii, July 2023.',
    year: 2024,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://www.ijcai.org/proceedings/2024/344' }],
  },
  {
    id: 'pub-ai-pilot-cockpit',
    title: 'AI Pilot in the Cockpit: An Investigation of Public Acceptance',
    url: 'https://www.tandfonline.com/doi/full/10.1080/10447318.2024.2301856',
    authors: 'Shan Gao, **Zhuoran Lu**, Hao Luan, Ming Yin, and Lei Wang.',
    venue: 'IJHCI',
    venueGroup: 'hci',
    venueFull: 'International Journal of Human–Computer Interaction (IJHCI)',
    year: 2024,
    focus: 'cognition',
    goal: 'understanding',
    links: [
      { label: 'PDF', url: 'https://www.tandfonline.com/doi/full/10.1080/10447318.2024.2301856' },
    ],
  },
  {
    id: 'pub-devils-advocate',
    title: "Enhancing AI-Assisted Group Decision Making through LLM-Powered Devil's Advocate",
    url: 'https://dl.acm.org/doi/10.1145/3640543.3645199',
    authors: 'Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.',
    venue: 'IUI',
    venueGroup: 'hci',
    venueFull:
      'The 29th ACM Conference on Intelligent User Interface (IUI), Greenville, March 2024.',
    year: 2024,
    focus: 'social',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3640543.3645199' }],
  },
  {
    id: 'pub-decoding-ai-nudge',
    title:
      "Decoding AI's Nudge: A Unified Framework to Predict Human Behavior in AI-assisted Decision Making",
    url: 'https://arxiv.org/abs/2401.05840',
    authors: 'Zhuoyan Li, **Zhuoran Lu**, and Ming Yin.',
    venue: 'AAAI',
    venueGroup: 'ai',
    venueFull: 'The 38th Conference on Artificial Intelligence (AAAI), Vancouver, February 2024.',
    year: 2024,
    focus: 'cognition',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2401.05840' }],
  },
  {
    id: 'pub-synthetic-data-generation',
    title:
      'Synthetic Data Generation with Large Language Models for Text Classification: Potential and Limitations',
    url: 'https://arxiv.org/abs/2310.07849',
    authors: 'Zhuoyan Li, Hangxiao Zhu, **Zhuoran Lu**, and Ming Yin.',
    venue: 'EMNLP',
    venueGroup: 'ai',
    venueFull:
      'The Empirical Methods in Natural Language Processing (EMNLP), Singapore, December 2023.',
    year: 2023,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://arxiv.org/abs/2310.07849' }],
  },
  {
    id: 'pub-strategic-adversarial-attacks',
    title:
      'Strategic Adversarial Attacks in AI-assisted Decision Making to Reduce Human Trust and Reliance',
    url: 'https://www.ijcai.org/proceedings/2023/337',
    authors: '**Zhuoran Lu**\\*, Zhuoyan Li\\*, Chun-Wei Chiang, and Ming Yin.',
    venue: 'IJCAI',
    venueGroup: 'ai',
    venueFull:
      'The 32nd International Joint Conference on Artificial Intelligence (IJCAI), Macao, August 2023',
    year: 2023,
    focus: 'cognition',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://www.ijcai.org/proceedings/2023/337' }],
  },
  {
    id: 'pub-two-heads',
    title:
      'Are Two Heads Better Than One in AI-Assisted Decision Making? Comparing the Behavior and Performance of Groups and Individuals in Human-AI Collaborative Recidivism Risk Assessment',
    url: 'https://dl.acm.org/doi/10.1145/3544548.3581015',
    authors: 'Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 41st ACM Conference on Human Factors in Computing Systems (CHI), Hamburg, May 2023.',
    year: 2023,
    focus: 'social',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3544548.3581015' }],
  },
  {
    id: 'pub-modeling-human-trust',
    title: 'Modeling Human Trust and Reliance in AI-assisted Decision Making: A Markovian Approach',
    authors: '**Zhuoran Lu**\\*, Zhuoyan Li\\*, and Ming Yin.',
    venue: 'AAAI',
    venueGroup: 'ai',
    venueFull:
      'The 37th Conference on Artificial Intelligence (AAAI), Washington, D.C., February 2023.',
    year: 2023,
    focus: 'cognition',
    goal: 'understanding',
    award: 'Oral Presentation',
    links: [],
  },
  {
    id: 'pub-credibility-indicators-detection',
    title:
      'The Effects of AI-based Credibility Indicators on the Detection and Spread of Misinformation under Social Influence',
    url: 'https://dl.acm.org/doi/10.1145/3555562',
    authors: '**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.',
    venue: 'CSCW',
    venueGroup: 'hci',
    venueFull:
      'The 25th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), Online, November 2022',
    year: 2022,
    focus: 'social',
    goal: 'understanding',
    award: 'Best Paper Award',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3555562' }],
  },
  {
    id: 'pub-biased-language',
    title:
      'Towards Better Detection of Biased Language with Scarce, Noisy, and Biased Annotations',
    url: 'https://dl.acm.org/doi/10.1145/3514094.3534142',
    authors: '**Zhuoran Lu**\\*, Zhuoyan Li\\*, and Ming Yin.',
    venue: 'AIES',
    venueGroup: 'ai',
    venueFull:
      'The 5th AAAI/ACM Conference on Artificial Intelligence, Ethics, and Society (AIES), Online, August 2022',
    year: 2022,
    focus: 'cognition',
    goal: 'designing',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3514094.3534142' }],
  },
  {
    id: 'pub-will-you-accept',
    title:
      'Will You Accept the AI Recommendation? Predicting Human Behavior in AI-Assisted Decision Making',
    authors: '**Zhuoran Lu**\\*, Xinru Wang\\*, and Ming Yin',
    venue: 'WWW',
    venueGroup: 'ai',
    venueFull: 'The Web Conference (WWW), Online, April 2022.',
    year: 2022,
    focus: 'cognition',
    goal: 'understanding',
    links: [],
  },
  {
    id: 'pub-human-reliance-ml',
    title:
      'Human Reliance on Machine Learning Models When Performance Feedback is Limited: Heuristics and Risks',
    url: 'https://dl.acm.org/doi/10.1145/3411764.3445562',
    authors: '**Zhuoran Lu** and Ming Yin.',
    venue: 'CHI',
    venueGroup: 'hci',
    venueFull:
      'The 39th ACM Conference on Human Factors in Computing Systems (CHI), Online, May 2021.',
    year: 2021,
    focus: 'cognition',
    goal: 'understanding',
    links: [{ label: 'PDF', url: 'https://dl.acm.org/doi/10.1145/3411764.3445562' }],
  },
]
