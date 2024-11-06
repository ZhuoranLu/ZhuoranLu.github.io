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

I am a Ph.D. student in Computer Science at Purdue University, fortunately advised by
Prof. [Ming Yin](http://mingyin.org/).

Prior to Purdue, I received my Bachelor's degree in Computer Science and Statistics from the University of Illinois at
Urbana-Champaign in 2019, advised by Prof. [Roxana Girju](https://linguistics.illinois.edu/directory/profile/girju) and
Prof. [Richard Sowers](http://publish.illinois.edu/r-sowers/).


## Research Interests

My research currently lies in the intersection of human-computer interaction and machine learning, mainly focusing on
human-AI interaction and human-centered AI.

I am also broadly interested in computational social science, crowdsourcing, and behavioral science.

**I am on the job market this year (2024-25). Please feel free to contact me regarding any relevant opportunities!**


<!-- 
My research interest includes neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


<!-- # 🔥 News
- *2022.02*: &nbsp;🎉🎉 Zhuoran dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2022.02*: &nbsp;🎉🎉 Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

# Publications 

<!-- <div class='paper-box'> -->
<!-- <div class='paper-box-image'>
<div> -->
<!-- <div class="badge">CVPR 2016</div> -->

<!-- <img src='images/500x300.png' alt="sym" width="100%"> -->

<!-- </div>

</div> -->
<!-- <div class='paper-box-text' markdown="1">

<strong>[Does More Advice Help? The Effects of Second Opinions in AI-Assisted Decision Making](../files/second-camera.pdf)</strong><br>
**Zhuoran Lu**, Dakuo Wang, and Ming Yin.<br>
The 27th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), San José, November 2024.<br>
Preliminary version in the CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023.<br>
<a style="background-color: #FB6571; color: black; padding: 3px; text-decoration: none;">CSCW</a> <a href="../">PDF</a>

</div> -->


<div class='paper-box-text' markdown="1">

## 2024

<strong>[Does More Advice Help? The Effects of Second Opinions in AI-Assisted Decision Making](../files/second-camera.pdf)</strong><br>
**Zhuoran Lu**, Dakuo Wang, and Ming Yin.<br>
The 27th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), San José, November 2024.<br>
Preliminary version in the CHI Workshop on Trust and Reliance in AI-Assisted Tasks (TRAIT), Hamburg, May 2023.<br>
<a style="background-color: #FB6571; color: black; padding: 3px; text-decoration: none;">CSCW</a> <a href="../">PDF</a>

<strong>[PEARL: Personalizing Large Language Model Writing Assistants with Generation-Calibrated Retrievers]() </strong><br>
Sheshera Mysore, **Zhuoran Lu**, Mengting Wan, Longqi Yang, Steve Menezes, Tina Baghaee, Emmanuel Barajas Gonzalez, Jennifer Neville, Tara Safavi.<br>
EMNLP Workshop on Customizable NLP (CustomNLP4U), Miami, November 2024.

<strong>[Mix and Match: Characterizing Heterogeneous Human Behavior in AI-assisted Decision Making]()</strong><br>
**Zhuoran Lu**, Hasan Amin, Zhuoyan Li, and Ming Yin.<br>
The 12th AAAI Conference on Human Computation and Crowdsourcing (HCOMP), Pittsburgh, October 2024.<br>
<a style="background-color: #A2BFE1; color: black; padding: 3px; text-decoration: none;">HCOMP</a> <a href="../">PDF</a>

<strong>[Designing Behavior-Aware AI to Improve the Human-AI Team Performance in AI-Assisted Decision Making]()</strong><br>
**Zhuoran Lu**\*, Hasan Amin*, and Ming Yin.<br>
The 33th International Joint Conference on Artificial Intelligence (IJCAI), Jeju, August 2024.<br>
Preliminary version in the ICML Workshop on Artificial Intelligence & Human Computer Interaction (AI HCI), Hawaii, July 2023.<br>
<a style="background-color: #94CCC3; color: black; padding: 3px; text-decoration: none;">IJCAI</a> <a href="../">PDF</a>

<strong>[AI Pilot in the Cockpit: An Investigation of Public Acceptance]()</strong><br>
Shan Gao, **Zhuoran Lu**, Hao Luan, Ming Yin, and Lei Wang.<br>
International Journal of Human–Computer Interaction (IJHCI) <br>
<a style="background-color: #F4B0A5; color: black; padding: 3px; text-decoration: none;">IJHCI</a> <a href="../">PDF</a>

<strong>[Enhancing AI-Assisted Group Decision Making through LLM-Powered Devil's Advocate]()</strong><br>
Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.<br>
The 29th ACM Conference on Intelligent User Interface (IUI), Greenville, March 2024.<br>
<a style="background-color: #D9939B; color: black; padding: 3px; text-decoration: none;">IUI</a> <a href="../">PDF</a>

<strong>[Decoding AI's Nudge: A Unified Framework to Predict Human Behavior in AI-assisted Decision Making]()</strong><br>
Zhuoyan Li, **Zhuoran Lu**, and Ming Yin.<br>
The 38th Conference on Artificial Intelligence (AAAI), Vancouver, February 2024.<br>
<a style="background-color: #A2BFE1; color: black; padding: 3px; text-decoration: none;">AAAI</a> <a href="../">PDF</a>

## 2023

<strong>[Synthetic Data Generation with Large Language Models for Text Classification: Potential and Limitations]()</strong><br>
Zhuoyan Li, Hangxiao Zhu, **Zhuoran Lu**, and Ming Yin.<br>
The Empirical Methods in Natural Language Processing (EMNLP), Singapore, December 2023.<br>
<a style="background-color: #B2D1D3; color: black; padding: 3px; text-decoration: none;">EMNLP</a> <a href="../">PDF</a>

<strong>[Strategic Adversarial Attacks in AI-assisted Decision Making to Reduce Human Trust and Reliance](../files/IJCAI__23_Confidence_Attack.pdf)</strong><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, Chun-Wei Chiang, and Ming Yin.<br>
The 32nd International Joint Conference on Artificial Intelligence (IJCAI), Macao, August 2023<br>
<a style="background-color: #94CCC3; color: black; padding: 3px; text-decoration: none;">IJCAI</a> <a href="../">PDF</a>

<strong>[Are Two Heads Better Than One in AI-Assisted Decision Making? Comparing the Behavior and Performance of Groups and Individuals in Human-AI Collaborative Recidivism Risk Assessment](../files/group-camera.pdf)</strong><br>
Chun-Wei Chiang, **Zhuoran Lu**, Zhuoyan Li, and Ming Yin.<br>
The 41st ACM Conference on Human Factors in Computing Systems (CHI), Hamburg, May 2023.<br>
<a style="background-color: #D9939B; color: black; padding: 3px; text-decoration: none;">CHI</a> <a href="../">PDF</a>

<strong>[Modeling Human Trust and Reliance in AI-assisted Decision Making: A Markovian Approach](../files/TrustModel.pdf)</strong><span style="color:red"> [Oral]</span><br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 37th Conference on Artificial Intelligence (AAAI), Washington, D.C., February 2023.<br>
<a style="background-color: #A2BFE1; color: black; padding: 3px; text-decoration: none;">AAAI</a> <a href="../">PDF</a>

## 2022

<strong>[The Effects of AI-based Credibility Indicators on the Detection and Spread of Misinformation under Social Influence](../files/misinformation.pdf)</strong><span style="color:red"> [Best Paper Award]</span><br>
**Zhuoran Lu**, Patrick Li, Weilong Wang, and Ming Yin.<br>
The 25th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW), Online, November 2022<br>
<a style="background-color: #FB6571; color: black; padding: 3px; text-decoration: none;">CSCW</a> <a href="../">PDF</a>

<strong>[Towards Better Detection of Biased Language with Scarce, Noisy, and Biased Annotations](../files/cleare.pdf)</strong> <br>
**Zhuoran Lu**\*, Zhuoyan Li\*, and Ming Yin.<br>
The 5th AAAI/ACM Conference on Artificial Intelligence, Ethics, and Society (AIES), Online, August 2022<br>
<a style="background-color: #B2D1D3; color: black; padding: 3px; text-decoration: none;">AIES</a> <a href="../">PDF</a>

<strong>[Will You Accept the AI Recommendation? Predicting Human Behavior in AI-Assisted Decision Making](../files/WWW_HAI_model.pdf)</strong> <br>
**Zhuoran Lu**\*, Xinru Wang\*, and Ming Yin <br>
The Web Conference (WWW), Online, April 2022.<br>
<a style="background-color: #B2D1D3; color: black; padding: 3px; text-decoration: none;">WWW</a> <a href="../">PDF</a>

## 2021

<strong>[Human Reliance on Machine Learning Models When Performance Feedback is Limited: Heuristics and Risks](../files/reliance.pdf)</strong><br>
**Zhuoran Lu** and Ming Yin.<br>
The 39th ACM Conference on Human Factors in Computing Systems (CHI), Online, May 2021.<br>
<a style="background-color: #D9939B; color: black; padding: 3px; text-decoration: none;">CHI</a> <a href="../">PDF</a>


<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> -->
<!-- - Zhuoran ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
<!-- </div> -->

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

# Industry Experiences
*2019.05 - 2020.02*, [Autodesk Research](https://github.com/), Toronto, ON. <br>
- [From Intent to Experience](), work with Yi Wang and Qian Zhou<br>

*2023.05 - 2023.09*, [Microsoft](https://github.com/), Seattle, WA.<br>
- [Office of Applied Research](https://github.com/), work with Mengting Wan and Longqi Yang<br>

*2023.01 - 2023.04*, [Honda Research Institute](https://github.com/), San Jose, CA.<br>
- [Human-centered Intelligence Group](https://github.com/), work with Shashank Mehrotra<br>


# Service

**Program Committee/Associate Chair**<br>
- 2024: CHI Late-Breaking Work, FAccT, ICWSM<br>
- 2023: Ubicomp/ISWC demos and posters<br>

**Reviewer:**<br>
- 2025: CHI <br>
- 2024: ICWSM, CHI, IUI, CSCW, IDC, DIS, CogSci<br>
- 2023: ICWSM, CHI, IUI, IDC, MobileHCI, CogSci, CSCW, DIS, ISS, CUI, CHI PLAY, FAccT, UIST<br>
- 2022: DIS, CHI PLAY, NordiCHI, MobileHCI, Ubicomp, ISWC, ICMI, SUI, HAI<br>
- Journal: IJHCI, TiiS, IPM, TKDD<br>


