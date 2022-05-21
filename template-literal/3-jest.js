const START_OF_LINE = '^';
const NEWLINE = '\\n';
const HEADING = '\\s*[^\\s]+\\s*';
const PIPE = '\\|';
const REPEATABLE_HEADING = `(${PIPE}${HEADING})*`;
const HEADINGS_FORMAT = new RegExp(
  START_OF_LINE + NEWLINE + HEADING + REPEATABLE_HEADING + NEWLINE,
  'g',
);

const jestTransform = (text, ...tags) => {
  console.log(HEADINGS_FORMAT)
  const matches = text[0].match(HEADINGS_FORMAT);
  console.log("🚀 ~ file: 3-jest.js ~ line 14 ~ jestTransform ~ matches", matches)
  //
  const vars = text[0].split('|').map(v => v.trim())

  console.log(vars)
}

jestTransform`
x       | y        | expected
 ${5}    | ${4}     | ${9}
 ${-10}  | ${10}    | ${0}
 ${2000} | ${-3000} | ${-1000}
`

// /jest-each/src/index.ts
// ??? what is 'cb' ??? magic in 'test

const test = (title, test, timeout) => bind(g.test)(table, ...data)(title, test, timeout);

// /jest-each/src/bind.ts
export default function bind(cb, supportsDone = true) {
  return (
    table, // our text
    ...taggedTemplateData, // tags
  ) =>
    function eachBind(title, test, timeout) { // [title]: `returns ${expected}`; [test]: () => {expect(a + b).toBe(expected)}
      title = convertDescriptorToString(title);

      const tests = isArrayTable(taggedTemplateData)
        ? buildArrayTests(title, table)
        // here bindtemplate
        : buildTemplateTests(title, table, taggedTemplateData);

       
        // here tests
        // @PARAMS
        // [row.arguments]: {a: 5, b: 4, expected: 9}
        // [row.title]: 'returns 9 when adding 5 to 4'
        return tests.forEach(row =>
          cb(
            row.title,
            applyArguments(supportsDone, row.arguments, test),
            timeout,
          ),
        )

         // ...
    }
}

const buildTemplateTests = (
  title: string,
  table: Global.EachTable,
  taggedTemplateData: Global.TemplateData,
): EachTests => {
  const headings = getHeadingKeys(table[0]); // A | ['x', 'y', 'expected']
  validateTemplateTableArguments(headings, taggedTemplateData); // B | проверка на совпадение количества параметров
  return convertTemplateTable(title, headings, taggedTemplateData); // C | headings: ['x', 'y', 'expected']; taggedTemplateData: [5, 4, 9, -10, 10, 0, 2000, -3000, -1000]
};

const getHeadingKeys = (headings: string): Array<string> =>
  extractValidTemplateHeadings(headings).replace(/\s/g, '').split('|');
  
// /jest-each/src/validation.ts
const START_OF_LINE = '^';
const NEWLINE = '\\n';
const HEADING = '\\s*[^\\s]+\\s*';
const PIPE = '\\|';
const REPEATABLE_HEADING = `(${PIPE}${HEADING})*`;
const HEADINGS_FORMAT = new RegExp(
  START_OF_LINE + NEWLINE + HEADING + REPEATABLE_HEADING + NEWLINE,
  'g',
);

export const extractValidTemplateHeadings = (headings: string): string => {
  const matches = headings.match(HEADINGS_FORMAT);
  if (matches === null) {
    throw new Error(
      `Table headings do not conform to expected format:\n\n${EXPECTED_COLOR(
        'heading1 | headingN',
      )}\n\nReceived:\n\n${RECEIVED_COLOR(pretty(headings))}`,
    );
  }

  return matches[0];
};

export const validateTemplateTableArguments = (headings, data) => {
  const incompleteData = data.length % headings.length;

  if (incompleteData > 0) {
    throw new Error()
  }
}

// C
function template(
  title: string,
  headings: Headings,
  row: Global.Row,
): EachTests {
  const table = convertRowToTable(row, headings);
  const templates = convertTableToTemplates(table, headings); 
  // => {x: 5, y: 4, expected: 9}
  return templates.map((template, index) => ({
    arguments: [template],
    title: interpolateVariables(title, template, index), 
    // =>  from 'returns $expected when adding $a to $b' on [5, 4, 9]
    // to 'returns 9 when adding 5 to 4'`
  }));
}

// convert to table 
const convertRowToTable = (row, headings) =>
  Array.from({length: row.length / headings.length}).map((_, index) =>
    row.slice(
      index * headings.length,
      index * headings.length + headings.length,
    ),
  );
// =>
// [5, 4, 9]
// [-10, 10, 0]
// [2000, -3000, -1000]


