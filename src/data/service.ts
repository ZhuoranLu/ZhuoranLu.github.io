import type { ServiceGroup } from '@/types'

export const service: ServiceGroup[] = [
  {
    id: 'svc-organizer',
    heading: 'Organizer',
    items: [
      'Interpreting Agent Behavior (IAB) @ NeurIPS',
    ],
  },
  {
    id: 'svc-pc',
    heading: 'Program Committee / Associate Chair',
    items: [
      'CHI, CHI Late-Breaking Work',
      'Ubicomp/ISWC demos and posters',
    ],
  },
  {
    id: 'svc-reviewer',
    heading: 'Reviewer',
    items: [
      'HCI venues: CHI, CSCW, UIST, DIS, IDC, MobileHCI, NordiCHI, Ubicomp, ISS, CUI, CHI PLAY, SUI, ICMI',
      'AI venues: NeurIPS, AAAI, EMNLP, ACL',
      'Interdisciplinary venues: ICWSM, CogSci, FAccT, HRI, IUI, HAI',
      'Journal: IJHCI, TiiS, IPM, TKDD',
    ],
  },
]
