export default [
  {
    name: "Major",
    abbr: "M",
    formula: "1 3 5",
    diagrams: [
      {},
      {
        string: 1,
        hide: [
          [1, 0],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Minor",
    abbr: "m",
    formula: "1 b3 5",
    diagrams: [
      {},
      {
        string: 1,
        hide: [
          [1, 0],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Dominant 7th",
    abbr: "<sup>7</sup>",
    formula: "1 3 5 b7",
    diagrams: [
      { hide: [[3, 2]] },
      {
        string: 1,
        hide: [
          [1, 0],
          [4, 2],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Major 7th",
    abbr: "M<sup>7</sup>",
    formula: "1 3 5 7",
    diagrams: [{ hide: [[3, 2]] }]
  },
  {
    name: "Minor 7th",
    abbr: "m<sup>7</sup>",
    formula: "1 b3 5 b7",
    diagrams: [{ hide: [[3, 2]] }]
  },
  {
    name: "6th",
    abbr: "<sup>6</sup>",
    formula: "1 3 5 6",
    diagrams: [
      {
        string: 1,
        hide: [
          [1, 0],
          [1, 2],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Minor 6th",
    abbr: "m<sup>6</sup>",
    formula: "1 b3 5 6",
    diagrams: [
      {
        string: 2,
        hide: [
          [1, 1],
          [2, 0],
          [2, 2]
        ]
      }
    ]
  },
  {
    name: "Diminished",
    abbr: "dim",
    formula: "1 b3 b5",
    diagrams: [{ hide: [[6, 0]] }]
  },
  {
    name: "Diminished 7th",
    abbr: "dim<sup>7</sup>",
    formula: "1 b3 b5 bb7",
    diagrams: [
      {
        width: 2,
        startMod: -1,
        hide: [
          [2, 2],
          [6, 1]
        ]
      }
    ]
  },
  {
    name: "Half diminished 7th",
    abbr: "<sup>ø7</sup>",
    formula: "1 b3 b5 b7",
    diagrams: [
      {
        width: 2,
        startMod: -1,
        hide: [
          [2, 2],
          [6, 1]
        ]
      }
    ]
  },
  {
    name: "Augmented",
    abbr: "aug",
    formula: "1 3 #5",
    diagrams: [{ string: 1, width: 4, startMod: -3, hide: [[6, 0]] }]
  },
  {
    name: "7th #5",
    abbr: "<sup>7#5</sup>",
    formula: "1 3 #5 b7",
    diagrams: [{ width: 2, hide: [[6, 0]] }]
  },
  {
    name: "9th",
    abbr: "<sup>9</sup>",
    formula: "1 3 5 b7 9",
    diagrams: [
      {
        string: 1,
        startMod: -1,
        width: 2,
        hide: [[1, 1]]
      }
    ]
  },
  {
    name: "7th #9",
    abbr: "<sup>7#9</sup>",
    formula: "1 3 5 b7 #9",
    diagrams: [
      {
        startMod: -1,
        width: 2,
        hide: [[6, 1]]
      }
    ]
  },
  {
    name: "Major 9th",
    abbr: "M<sup>9</sup>",
    formula: "1 3 5 7 9",
    diagrams: [
      {
        string: 1,
        startMod: -1,
        hide: [
          [1, 1],
          [2, 0],
          [6, 1]
        ]
      }
    ]
  },
  {
    name: "Added 9th",
    abbr: "<sup>add9</sup>",
    formula: "1 3 5 9",
    diagrams: [
      {
        string: 2,
        startMod: -2,
        hide: [
          [1, 0],
          [1, 2],
          [2, 2],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Minor 9th",
    abbr: "m<sup>9</sup>",
    formula: "1 b3 5 b7 9",
    diagrams: [
      {
        string: 1,
        startMod: -2,
        hide: [
          [1, 2],
          [2, 0],
          [5, 0],
          [6, 2]
        ]
      }
    ]
  },
  {
    name: "Minor add 9th",
    abbr: "min<sup>add9</sup>",
    formula: "1 b3 5 9",
    diagrams: [{ string: 1, startMod: 1, width: 2 }]
  },
  {
    name: "11th",
    abbr: "<sup>11</sup>",
    formula: "1 (3) 5 b7 9 11",
    notes: "3rd often omitted",
    diagrams: [
      {
        startMod: -2,
        hide: [
          [1, 0],
          [2, 1],
          [2, 2],
          [5, 2],
          [6, 2],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Minor 11th",
    abbr: "m<sup>11</sup>",
    formula: "1 b3 5 b7 9 11",
    diagrams: [
      {
        startMod: -2,
        hide: [
          [1, 0],
          [2, 0],
          [2, 2],
          [4, 1],
          [5, 2],
          [6, 2],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "7th #11",
    abbr: "<sup>7#11</sup>",
    formula: "1 3 5 b7 #11",
    diagrams: [
      {
        string: 2,
        hide: [
          [1, 2],
          [2, 0],
          [4, 2]
        ]
      }
    ]
  },
  {
    name: "Major 7th #11",
    abbr: "M<sup>7#11</sup>",
    formula: "1 3 5 7 9 #11",
    diagrams: [
      {
        startMod: -1,
        hide: [
          [1, 0],
          [2, 0],
          [2, 2],
          [4, 0],
          [5, 0],
          [5, 1],
          [6, 1]
        ]
      }
    ]
  },
  {
    name: "13th",
    abbr: "<sup>13</sup>",
    formula: "1 3 5 b7 9 (11) 13",
    notes: "11th often omitted",
    diagrams: [
      {
        hide: [
          [1, 2],
          [2, 0],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 0],
          [6, 0],
          [6, 2]
        ]
      }
    ]
  },
  {
    name: "Major 13th",
    abbr: "M<sup>13</sup>",
    formula: "1 3 5 7 9 (11) 13",
    notes: "11th often omitted",
    diagrams: [
      {
        hide: [
          [1, 2],
          [2, 0],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 0],
          [6, 0],
          [6, 2]
        ]
      }
    ]
  },
  {
    name: "Minor 13th",
    abbr: "m<sup>13</sup>",
    formula: "1 b3 5 b7 9 11 13",
    diagrams: [
      {
        string: 1,
        hide: [
          [1, 0],
          [1, 2],
          [2, 2],
          [3, 0],
          [3, 2],
          [4, 2],
          [5, 0],
          [6, 0]
        ]
      }
    ]
  },
  {
    name: "Suspended 4th",
    abbr: "sus4",
    formula: "1 4 5",
    diagrams: [{ hide: [[2, 0]] }]
  },
  {
    name: "Suspended 2nd",
    abbr: "sus2",
    formula: "1 2 5",
    diagrams: [
      {
        string: 1,
        hide: [
          [1, 0],
          [2, 2]
        ]
      }
    ]
  },
  {
    name: "Power Chord",
    abbr: "<sup>5</sup>",
    formula: "1 5",
    diagrams: [
      {
        hide: [
          [5, 0],
          [6, 0]
        ]
      }
    ]
  }
];
