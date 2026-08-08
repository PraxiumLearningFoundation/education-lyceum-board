/*
 * Lyceum inquiry archive - the single source of truth for the board.
 *
 * This is intentionally a plain JS file (not JSON) so the page can run by
 * double-clicking index.html, with no server or build step. To add or update
 * a meeting, copy a block below and edit it. Anything left as an empty array
 * shows up on the site as "not yet transcribed - contribute," which is the
 * whole point: most of these still need to be lifted out of the old slides.
 *
 * Schema (mirrors the original src/data/lyceum_2025_03.json):
 *   id           unique slug, also used in the URL hash (#/inquiry/<id>)
 *   date         ISO date of the gathering (YYYY-MM-DD)
 *   inquiry      the question the circle explored
 *   tags         themes, used for search + filtering
 *   status       "transcribed" | "needs-transcription" | "founding"
 *   theories     Theories / Concepts - framing & what we already know
 *   applications Application - how this is handled around the world
 *   sources      Source / Input - what/who we need for shared understanding
 *   policies     Regulations / Policies / references (optional)
 *   opportunities  Opportunities - what is favourable for us
 *   challenges   Challenges - the obstacles, perceived or real
 *   quote        a highlighted line from the discussion
 *   callToAction Way Ahead - who took responsibility for the follow-up
 *   stewards     people who volunteered to carry the inquiry forward
 */

window.LYCEUM_DATA = [
  {
    id: "2024-05-24-founding",
    date: "2024-05-24",
    inquiry: "Our founding gathering - establishing the Lyceum",
    tags: ["community", "founding"],
    status: "founding",
    theories: [],
    applications: [],
    sources: [],
    policies: [],
    opportunities: [],
    challenges: [],
    quote: "An endeavor for shared purpose in families and communities.",
    callToAction: "First circle: we agreed on the rules, norms, and the Sequence of Inquiry that every gathering since has followed.",
    stewards: []
  },
  {
    id: "2024-06-30-work-ethic",
    date: "2024-06-30",
    inquiry: "What should we strive for in a modern work ethic?",
    tags: ["work", "values", "economy"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2024-08-04-housing",
    date: "2024-08-04",
    inquiry: "How can we help families afford housing in their communities?",
    tags: ["housing", "families", "economy"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2024-09-15-adolescents",
    date: "2024-09-15",
    inquiry: "How do we mentor adolescents (15+) into legal adulthood?",
    tags: ["youth", "education", "family"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2024-10-20-nature",
    date: "2024-10-20",
    inquiry: "How do we cultivate peaceful co-existence with nature within our communities?",
    tags: ["environment", "community", "sustainability"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2025-01-12-humanitarian",
    date: "2025-01-12",
    inquiry: "How can we embody the values of a humanitarian in our communities?",
    tags: ["values", "service", "community"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2025-02-23-healthcare-equity",
    date: "2025-02-23",
    inquiry: "How can we advocate for healthcare equity in our communities?",
    tags: ["healthcare", "equity", "policy"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2025-03-23-education",
    date: "2025-03-23",
    inquiry: "What should leaders do to empower education in communities?",
    tags: ["education", "leadership", "equity", "policy"],
    status: "transcribed",
    theories: [
      "Public schools (primary and secondary) have inconsistencies across local and state budgets.",
      "Schools on military bases - federal funding available to enhance facilities and classrooms.",
      "Private religious schools - facilities dependent on tuition.",
      "Government role in empowering underserved communities and people with disabilities."
    ],
    applications: [
      "Chile's 'Gratuidad' - free public university for qualified students.",
      "Canada's StrongerBC Future Skills - money for access to education.",
      "U.S. school zones - affluent areas lead to inequality.",
      "<a href='https://en.wikipedia.org/wiki/Education_in_Asia' target='_blank' rel='noopener'>Competition in Asia</a> - entrance exams and high-stress culture.",
      "Japan / Australia national curriculum expectations."
    ],
    sources: [
      "Need for fiscal transparency (salaries, funding, grants).",
      "Need for advocacy to guarantee human rights and education access.",
      "Underfunding education weakens districts."
    ],
    policies: [
      "Section 256 - 'separate, yet equal' laws in Alabama.",
      "National Defense Education Act - U.S. STEM focus after Sputnik.",
      "Woodland High School - bias in Pittsburgh schooling.",
      "'I hate the Ivy League' - Malcolm Gladwell podcast."
    ],
    opportunities: [
      "Create local dialogue on education.",
      "Forge community identity around education.",
      "Include language / morals in curriculum."
    ],
    challenges: [
      "Safety concerns.",
      "Lack of respect toward workers.",
      "Language / cultural barriers for newcomers."
    ],
    quote: "Dissolving the Department of Education shows citizens that we value education less than we think we do.",
    callToAction: "Rachel G. volunteered to research more on this inquiry. Ehren and Hez offered to support by gathering information. Ehren will speak with Marcia to learn more about her volunteer work helping female migrants integrate into Vancouver.",
    stewards: ["Rachel G.", "Ehren", "Hez"]
  },
  {
    id: "2025-04-28-tragedy",
    date: "2025-04-28",
    inquiry: "How can we discuss tragedy with our children?",
    tags: ["family", "children", "wellbeing"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2025-06-01-healthcare-balance",
    date: "2025-06-01",
    inquiry: "How do we balance healthcare needs and social expectations in a community?",
    tags: ["healthcare", "community", "policy"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  },
  {
    id: "2025-11-30-cultural-acceptance",
    date: "2025-11-30",
    inquiry: "How can we overcome resistance to cultural acceptance in our communities?",
    tags: ["culture", "belonging", "community"],
    status: "needs-transcription",
    theories: [], applications: [], sources: [], policies: [],
    opportunities: [], challenges: [],
    quote: "",
    callToAction: "",
    stewards: []
  }
];
