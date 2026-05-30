---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a Senior Research Scientist @ Center for Advanced AI, Accenture. I received my Ph.D. in Computer Science at Purdue University, fortunately advised by
Prof. [Ming Yin](http://mingyin.org/).

Prior to Purdue, I received my Bachelor's degree in Computer Science and Statistics from the University of Illinois at
Urbana-Champaign in 2019, advised by Prof. [Roxana Girju](https://linguistics.illinois.edu/directory/profile/girju) and
Prof. [Richard Sowers](http://publish.illinois.edu/r-sowers/).


## Research Interests

My research interests are in the intersection of HCI and AI, mainly focusing on human-AI interaction and human-centered AI. 

Specifically, my research aims to empower humans to engage more effectively and appropriately with AI, with a focus on the paradigm of **human-AI decision-making**. I understand human-AI interaction and design human-centered AI based on two perspectives:
- Human decision makers' cognitive process of engaging with AI, which potentially has a bias.
- Social influence from other information sources in addition to AI.

I am also broadly interested in applied machine learning, computational social science, crowdsourcing, and behavioral science.

<!-- - **<span style="color:red">  I am on the job market this year (2025-26). Please feel free to contact me regarding any relevant opportunities! </span>** -->


<!-- 
My research interest includes neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


<span class='anchor' id='news'></span>
# News
- *2025.01*: &nbsp; 3 papers accepted by CHI 2025! See you in Yokohama!
- *2024.11*: &nbsp; I will present our paper on [Second Opinions in Human-AI Decision-making](https://dl.acm.org/doi/10.1145/3653708) at CSCW 2024! See you in Costa Rica!
- *2024.01*: &nbsp; I’m selected as a recipient of the [Bilsland Dissertation Fellowship]()!
- *2023.11*: &nbsp; Received a special recognition for outstanding reviews at CHI.
- *2023.07*: &nbsp; Our paper on [Modeling Human Trust and Reliance on in AI]() was selected as an Oral Presentation at AAAI 2023.
- *2022.10*: &nbsp; Our paper on [AI & Misinformation](https://dl.acm.org/doi/10.1145/3555562) received the [best paper award](https://programs.sigchi.org/cscw/2022/awards/best-papers) at CSCW 2022!


<span class='anchor' id='publications'></span>
# Selected Publications & Manuscripts

<sub>\* indicates equal contributions, # indicates senior author.</sub>

<div class="pub-filters">
  <div class="pub-filter-row">
    <span class="pub-filter-label">Venue</span>
    <button class="pub-filter-btn active" data-filter-type="venue" data-filter="all">All</button>
    <button class="pub-filter-btn" data-filter-type="venue" data-filter="hci">HCI</button>
    <button class="pub-filter-btn" data-filter-type="venue" data-filter="ai">AI / ML</button>
    <button class="pub-filter-btn" data-filter-type="venue" data-filter="preprint">Preprint</button>
  </div>
  <div class="pub-filter-row pub-filter-row--stacked">
    <span class="pub-filter-question">What factors shape human–AI interaction?</span>
    <div class="pub-filter-btns">
      <button class="pub-filter-btn active" data-filter-type="focus" data-filter="all">All</button>
      <button class="pub-filter-btn" data-filter-type="focus" data-filter="cognition">Individual Cognition</button>
      <button class="pub-filter-btn" data-filter-type="focus" data-filter="social">Social Influence</button>
    </div>
  </div>
  <div class="pub-filter-row pub-filter-row--stacked">
    <span class="pub-filter-question">How do we build human-centered AI?</span>
    <div class="pub-filter-btns">
      <button class="pub-filter-btn active" data-filter-type="goal" data-filter="all">All</button>
      <button class="pub-filter-btn" data-filter-type="goal" data-filter="understanding">Understanding Human-AI Interaction</button>
      <button class="pub-filter-btn" data-filter-type="goal" data-filter="designing">Designing Human-centered AI</button>
    </div>
  </div>
</div>

<!-- <div class='paper-box'> -->
<!-- <div class='paper-box-image'>
<div> -->
<!-- <div class="badge">CVPR 2016</div> -->

<!-- <img src='images/500x300.png' alt="sym" width="100%"> -->

<!-- </div>

</div> -->
<!-- <div class='paper-box-text' markdown="1">

<a style="background-color: #D97373; color: black; padding: 3px; text-decoration: none;">CSCW</a> <strong>[Does More Advice Help? The Effects of Second Opinions in AI-Assisted Decision Making](../files/second-camera.pdf)</strong><br>
**Zhuoran Lu**, Dakuo Wang, and Ming Yin.<br>
The 27th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), San José, November 2024.<br>
Preliminary version in the CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023.<br>
<a href="../files/second-camera.pdf">PDF</a>

</div> -->


<div class='paper-box-text' markdown="1">


<a style="background-color: #C0C0C0; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">arXiv</a> <strong>[How to Interpret Agent Behavior](https://arxiv.org/abs/2605.13625)</strong><br>
Jie Gao, Kaiser Sun, Jen-tse Huang, Katherine Van Koevering, Sijie Ji, Heyuan Huang, Weiyan Shi, **Zhuoran Lu**\#, Ziang Xiao, Daniel Khashabi, and Mark Dredze.<br>
Preprint, 2026.<br>
<a href="https://arxiv.org/abs/2605.13625">PDF</a>

<a style="background-color: #C0C0C0; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">arXiv</a> <strong>[AutoRedTrader: Autonomous Red Teaming of Trading Agents through Synthetic Misinformation Injection](https://arxiv.org/abs/2605.09185)</strong><br>
Zhiwei Liu, Yangyang Yu, Yupeng Cao, Yuechen Jiang, Haohang Li, **Zhuoran Lu**\#, Yuyan Wang, Yixiang Zheng, Xiaorui Guo, Calvin Yixiang Cheng, and Sophia Ananiadou.<br>
Preprint, 2026.<br>
<a href="https://arxiv.org/abs/2605.09185">PDF</a>

<a style="background-color: #C0C0C0; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">arXiv</a> <strong>[Tracing Generative AI in Digital Art: A Longitudinal Study of Chinese Painters' Attitudes, Practices, and Identity Negotiation](https://arxiv.org/abs/2511.03117)</strong><br>
Yibo Meng, Ruiqi Chen, **Zhuoran Lu**\#, Shuai Ma, and Chengxi Zang.<br>
Preprint, 2025.<br>
<a href="https://arxiv.org/abs/2511.03117">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[Large Language Model (LLM)-driven Adversarial Social Influences in Online Information Spread: Risks and Interventions.](https://doi.org/10.1145/3772318.3790442)</strong><br>
**Zhuoran Lu**\*, Gionnieve Lim*, and Ming Yin.<br>
The 44th ACM Conference on Human Factors in Computing Systems (CHI), Barcelona, May 2026.<br>
<a href="https://doi.org/10.1145/3772318.3790442">PDF</a>

<a style="background-color: #4A75B0; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">ICLR</a> <strong> [Human-LLM Collaborative Feature Engineering for Tabular Data](https://arxiv.org/abs/2601.21060)</strong><br>
Zhuoyan Li, Aditya Bansal, Jinzhao Li, Shishuang He, **Zhuoran Lu**, Mutian Zhang, Qin Liu, Yiwei Yang, Swati Jain, Ming Yin, and Yunyao Li. <br>
The Fourteenth International Conference on Learning Representations (ICLR), Rio de Janeiro, April 2026. <br>
<a href="https://arxiv.org/abs/2601.21060">PDF</a>


<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[From Text to Trust: Empowering AI-assisted Decision Making with Adaptive LLM-powered Analysis](https://dl.acm.org/doi/10.1145/3706598.3713133)</strong><br>
Zhuoyan Li, Hangxiao Zhu, **Zhuoran Lu**, Ziang Xiao, and Ming Yin.<br>
The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.<br>
<a href="https://dl.acm.org/doi/10.1145/3706598.3713133">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[Understanding the Effects of AI-based Credibility Indicators When People Are Influenced By Both Peers and Experts](https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/CHI25/784/5b747fc9-da77-11ef-ada9-16bb50361d1f/OUT/chi25-784.html/)</strong><br>
**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.<br>
The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.<br>
<a href="https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/CHI25/784/5b747fc9-da77-11ef-ada9-16bb50361d1f/OUT/chi25-784.html/">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[WhatELSE: Shaping Narrative Space at Configurable Level of Abstraction for AI-bridged Interactive Storytelling.](https://arxiv.org/abs/2502.18641)</strong><br>
**Zhuoran Lu**, Qian Zhou, and Yi Wang.<br>
The 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.<br>
<a href="https://arxiv.org/abs/2502.18641">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI-LBW</a> <strong>[Understanding the Effects of Large Language Model (LLM)-driven Adversarial Social Influences in Online Information Spread.](https://dl.acm.org/doi/full/10.1145/3706599.3720019)</strong><br>
**Zhuoran Lu**\*, Gionnieve Lim*, and Ming Yin.<br>
Late-Breaking Work (LBW) of the 43rd ACM Conference on Human Factors in Computing Systems (CHI), Yokohama, May 2025.<br>
<a href="https://dl.acm.org/doi/full/10.1145/3706599.3720019">PDF</a>


<a style="background-color: #D97373; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CSCW</a> <strong>[Does More Advice Help? The Effects of Second Opinions in AI-Assisted Decision Making](https://dl.acm.org/doi/10.1145/3653708)</strong><br>
**Zhuoran Lu**, Dakuo Wang, and Ming Yin.<br>
The 27th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), San José, November 2024.<br>
Preliminary version in the CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023.<br>
<a href="https://dl.acm.org/doi/10.1145/3653708">PDF</a>

<strong>[PEARL: Personalizing Large Language Model Writing Assistants with Generation-Calibrated Retrievers](https://arxiv.org/abs/2311.09180) </strong><br>
Sheshera Mysore, **Zhuoran Lu**, Mengting Wan, Longqi Yang, Steve Menezes, Tina Baghaee, Emmanuel Barajas Gonzalez, Jennifer Neville, Tara Safavi.<br>
EMNLP Workshop on Customizable NLP (CustomNLP4U), Miami, November 2024.

<a style="background-color: #7FA9D9; color: black; padding: 3px; border-radius: 5px;text-decoration: none;">HCOMP</a> <strong>[Mix and Match: Characterizing Heterogeneous Human Behavior in AI-assisted Decision Making](https://ojs.aaai.org/index.php/HCOMP/article/view/31604)</strong><br>
**Zhuoran Lu**, Hasan Amin, Zhuoyan Li, and Ming Yin.<br>
The 12th AAAI Conference on Human Computation and Crowdsourcing (HCOMP), Pittsburgh, October 2024.<br>
<a href="https://ojs.aaai.org/index.php/HCOMP/article/view/31604">PDF</a>

<a style="background-color: #5B8AC4; color: black; padding: 3px;border-radius: 5px; text-decoration: none;">IJCAI</a> <strong>[Designing Behavior-Aware AI to Improve the Human-AI Team Performance in AI-Assisted Decision Making](https://www.ijcai.org/proceedings/2024/344)</strong><br>
**Zhuoran Lu**\*, Hasan Amin*, and Ming Yin.<br>
The 33th International Joint Conference on Artificial Intelligence (IJCAI), Jeju, August 2024.<br>
Preliminary version in the ICML Workshop on Artificial Intelligence & Human Computer Interaction (AI HCI), Hawaii, July 2023.<br>
<a href="https://www.ijcai.org/proceedings/2024/344">PDF</a>

<a style="background-color: #EBA89A; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">IJHCI</a> <strong>[AI Pilot in the Cockpit: An Investigation of Public Acceptance](https://www.tandfonline.com/doi/full/10.1080/10447318.2024.2301856)</strong><br>
Shan Gao, **Zhuoran Lu**, Hao Luan, Ming Yin, and Lei Wang.<br>
International Journal of Human–Computer Interaction (IJHCI) <br>
<a href="https://www.tandfonline.com/doi/full/10.1080/10447318.2024.2301856">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">IUI</a> <strong>[Enhancing AI-Assisted Group Decision Making through LLM-Powered Devil's Advocate](https://dl.acm.org/doi/10.1145/3640543.3645199)</strong><br>
Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.<br>
The 29th ACM Conference on Intelligent User Interface (IUI), Greenville, March 2024.<br>
<a href="https://dl.acm.org/doi/10.1145/3640543.3645199">PDF</a>

<a style="background-color: #7FA9D9; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">AAAI</a> <strong>[Decoding AI's Nudge: A Unified Framework to Predict Human Behavior in AI-assisted Decision Making](https://arxiv.org/abs/2401.05840)</strong><br>
Zhuoyan Li, **Zhuoran Lu**, and Ming Yin.<br>
The 38th Conference on Artificial Intelligence (AAAI), Vancouver, February 2024.<br>
<a href="https://arxiv.org/abs/2401.05840">PDF</a>

<a style="background-color: #A5C0DE; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">EMNLP</a> <strong>[Synthetic Data Generation with Large Language Models for Text Classification: Potential and Limitations](https://arxiv.org/abs/2310.07849)</strong><br>
Zhuoyan Li, Hangxiao Zhu, **Zhuoran Lu**, and Ming Yin.<br>
The Empirical Methods in Natural Language Processing (EMNLP), Singapore, December 2023.<br>
<a href="https://arxiv.org/abs/2310.07849">PDF</a>

<a style="background-color: #5B8AC4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">IJCAI</a> <strong>[Strategic Adversarial Attacks in AI-assisted Decision Making to Reduce Human Trust and Reliance](https://www.ijcai.org/proceedings/2023/337)</strong><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, Chun-Wei Chiang, and Ming Yin.<br>
The 32nd International Joint Conference on Artificial Intelligence (IJCAI), Macao, August 2023<br>
<a href="https://www.ijcai.org/proceedings/2023/337">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[Are Two Heads Better Than One in AI-Assisted Decision Making? Comparing the Behavior and Performance of Groups and Individuals in Human-AI Collaborative Recidivism Risk Assessment](https://dl.acm.org/doi/10.1145/3544548.3581015)</strong><br>
Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.<br>
The 41st ACM Conference on Human Factors in Computing Systems (CHI), Hamburg, May 2023.<br>
<a href="https://dl.acm.org/doi/10.1145/3544548.3581015">PDF</a>

<a style="background-color: #7FA9D9; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">AAAI</a> <strong>[Modeling Human Trust and Reliance in AI-assisted Decision Making: A Markovian Approach](../files/TrustModel.pdf)</strong><span style="color:red"><br> <b>[Oral Presentation]</b></span><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 37th Conference on Artificial Intelligence (AAAI), Washington, D.C., February 2023.<br>
<a href="../files/TrustModel.pdf">PDF</a>

<a style="background-color: #D97373; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CSCW</a> <strong>[The Effects of AI-based Credibility Indicators on the Detection and Spread of Misinformation under Social Influence](https://dl.acm.org/doi/10.1145/3555562)</strong><span style="color:red"> <br> <b>[Best Paper Award]</b></span><br>
**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.<br>
The 25th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), Online, November 2022<br>
<a href="https://dl.acm.org/doi/10.1145/3555562">PDF</a>

<a style="background-color: #A5C0DE; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">AIES</a> <strong>[Towards Better Detection of Biased Language with Scarce, Noisy, and Biased Annotations](https://dl.acm.org/doi/10.1145/3514094.3534142)</strong> <br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 5th AAAI/ACM Conference on Artificial Intelligence, Ethics, and Society (AIES), Online, August 2022<br>
<a href="https://dl.acm.org/doi/10.1145/3514094.3534142">PDF</a>

<a style="background-color: #A5C0DE; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">WWW</a> <strong>[Will You Accept the AI Recommendation? Predicting Human Behavior in AI-Assisted Decision Making](../files/WWW_HAI_model.pdf)</strong> <br>
**Zhuoran Lu**\*, Xinru Wang\*, and Ming Yin <br>
The Web Conference (WWW), Online, April 2022.<br>
<a href="../files/WWW_HAI_model.pdf">PDF</a>

<a style="background-color: #E8A4A4; color: black; padding: 3px; border-radius: 5px; text-decoration: none;">CHI</a> <strong>[Human Reliance on Machine Learning Models When Performance Feedback is Limited: Heuristics and Risks](https://dl.acm.org/doi/10.1145/3411764.3445562)</strong><br>
**Zhuoran Lu** and Ming Yin.<br>
The 39th ACM Conference on Human Factors in Computing Systems (CHI), Online, May 2021.<br>
<a href="https://dl.acm.org/doi/10.1145/3411764.3445562">PDF</a>


<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> -->
<!-- - Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
<!-- </div> -->

<script>
(function(){
  const VENUE_MAP = {
    'CHI':'hci','CHI-LBW':'hci','CSCW':'hci','IUI':'hci','IJHCI':'hci','HCOMP':'hci',
    'AAAI':'ai','IJCAI':'ai','ICLR':'ai','EMNLP':'ai','AIES':'ai','WWW':'ai',
    'arXiv':'preprint'
  };
  // [title substring (unique), focus, goal]
  const PAPER_TAGS = [
    ['Interpret Agent Behavior',                      'cognition', 'understanding'],
    ['AutoRedTrader',                                 'social',    'designing'],
    ['Tracing Generative AI in Digital Art',          'social',    'understanding'],
    ['Risks and Interventions',                       'social',    'designing'],
    ['Human-LLM Collaborative Feature Engineering',   'cognition', 'designing'],
    ['From Text to Trust',                            'cognition', 'designing'],
    ['Credibility Indicators When People',            'social',    'understanding'],
    ['WhatELSE',                                      'cognition', 'designing'],
    ['Understanding the Effects of Large Language',   'social',    'understanding'],
    ['Does More Advice Help',                         'social',    'understanding'],
    ['PEARL',                                         'cognition', 'designing'],
    ['Mix and Match',                                 'cognition', 'understanding'],
    ['Designing Behavior-Aware AI',                   'cognition', 'designing'],
    ['AI Pilot in the Cockpit',                       'cognition', 'understanding'],
    ["Devil's Advocate",                              'social',    'designing'],
    ["Decoding AI's Nudge",                           'cognition', 'understanding'],
    ['Synthetic Data Generation',                     'cognition', 'designing'],
    ['Strategic Adversarial Attacks',                 'cognition', 'understanding'],
    ['Are Two Heads Better Than One',                 'social',    'understanding'],
    ['Modeling Human Trust',                          'cognition', 'understanding'],
    ['Credibility Indicators on the Detection',       'social',    'understanding'],
    ['Detection of Biased Language',                  'cognition', 'designing'],
    ['Will You Accept the AI Recommendation',         'cognition', 'understanding'],
    ['Human Reliance on Machine Learning Models',     'cognition', 'understanding']
  ];

  function classify(p){
    const badge = p.querySelector('a[style*="background-color"]');
    p.dataset.venue = badge ? (VENUE_MAP[badge.textContent.trim()] || 'other') : 'other';
    const t = p.querySelector('strong')?.textContent || '';
    const hit = PAPER_TAGS.find(([sub]) => t.includes(sub));
    if (hit) {
      p.dataset.focus = hit[1];
      p.dataset.goal  = hit[2];
    } else {
      p.dataset.focus = 'cognition';
      p.dataset.goal  = 'understanding';
    }
  }

  function init(){
    const entries = document.querySelectorAll('.paper-box-text > p');
    if (!entries.length) return;
    entries.forEach(classify);
    const state = {venue:'all', focus:'all', goal:'all'};
    function apply(){
      entries.forEach(p => {
        const okV = state.venue==='all' || p.dataset.venue===state.venue;
        const okF = state.focus==='all' || p.dataset.focus===state.focus;
        const okG = state.goal ==='all' || p.dataset.goal ===state.goal;
        p.style.display = (okV && okF && okG) ? '' : 'none';
      });
    }
    document.querySelectorAll('.pub-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.filterType, val = btn.dataset.filter;
        state[type] = val;
        document.querySelectorAll('.pub-filter-btn[data-filter-type="'+type+'"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        apply();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
</script>

<!-- - [Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

<!-- # 🎖 Honors and Awards
- *2021.10* Best 
- *2021.09* Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

<!-- # Educations
- *2019.06 - 2025.05 (Expected)*, Ph.D. in Computer Science, Purdue University
- *2017.01 - 2019.05*, B.S. in Computer Science and Statistics, University of Illinois at Urbana-Champaign

# Invited Talks
- *2021.06*, Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

<span class='anchor' id='industry-experiences'></span>
# Industry Experiences
*2024.05 - 2024.08*, [Autodesk Research](https://www.research.autodesk.com/), Toronto, ON. <br>
- [From Intent to Experience](https://www.research.autodesk.com/), work with Yi Wang and Qian Zhou<br>

*2023.05 - 2023.09*, [Microsoft](https://github.com/), Seattle, WA.<br>
- [Office of Applied Research](https://www.microsoft.com/en-us/research/group/office-of-applied-research/), work with Mengting Wan and Longqi Yang<br>

*2023.01 - 2023.04*, [Honda Research Institute](https://usa.honda-ri.com/home), San Jose, CA.<br>
- [Human-centered Intelligence Group](https://usa.honda-ri.com/human-factors-ergonomics), work with Shashank Mehrotra<br>


<span class='anchor' id='service'></span>
# Service

**Program Committee/Associate Chair**<br>
- 2025: CHI Late-Breaking Work, FAccT<br>
- 2024: CHI Late-Breaking Work, FAccT<br>
- 2023: Ubicomp/ISWC demos and posters<br>

**Reviewer:**<br>
- 2025: ICWSM, CHI, CogSci, CSCW, HRI <br>
- 2024: ICWSM, CHI, CogSci, CSCW, IUI, IDC, DIS, <br>
- 2023: ICWSM, CHI, CogSci, CSCW, IUI, IDC, DIS, MobileHCI, ISS, CUI, CHI PLAY, FAccT, UIST<br>
- 2022: DIS, CHI PLAY, NordiCHI, MobileHCI, Ubicomp, ISWC, ICMI, SUI, HAI<br>
- Journal: IJHCI, TiiS, IPM, TKDD<br>


