// styled
import { useEffect, useRef } from "react";

const myStyled = (TargetComponent) => (strs, ...exprs) => (props) => {
  const ref = useRef(null)
  const interpolateStyle = () => {
    const style = exprs.reduce((acc, expr, index) => {
      const value = typeof expr === 'function' ? expr(props) : expr;
      
      return acc + value + strs[index + 1];
    }, strs[0]);

    ref.current.setAttribute('style', style);
  }

  useEffect(() => {
    interpolateStyle();
  })

  return (<TargetComponent {...props} ref={ref}/> ) 
};

export default function App() {
  const primaryColor = 'aqua';

  const Button = myStyled('button')`
    background: ${({ primary }) => primary ? primaryColor : 'white'};
    color: ${({ primary }) => primary ? 'white' : primaryColor};
    padding: 0.25rem 1rem; 
    border: solid 2px ${primaryColor}; 
    border-radius: 3px;
    margin: 0.5rem;
    font-size: 1rem;
  `;

  return (
    <Button color primary>Click me!</Button>
  );
}

// graphql
// graphql-tag/src/index.ts
function parseDocument(source: string) {
  var cacheKey = normalize(source);
  if (!docCache.has(cacheKey)) {
    const parsed = parse(source);
    if (!parsed || parsed.kind !== 'Document') {
      throw new Error('Not a valid GraphQL document.');
    }
    
    // ...
  }
}

export function gql(
  literals: string | readonly string[],
  ...args: any[]
) {

  if (typeof literals === 'string') {
    literals = [literals];
  }

  let result = literals[0];

  args.forEach((arg, i) => {
    if (arg && arg.kind === 'Document') {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });

  return parseDocument(result);
}

// 
export function parse(
  source: string | Source,
): DocumentNode {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}

//export class Parser {
parseDocument(): DocumentNode {
  return this.node<DocumentNode>(this._lexer.token, {
    kind: Kind.DOCUMENT,
    definitions: this.many(
      TokenKind.SOF,
      this.parseDefinition,
      TokenKind.EOF,
    ),
  });
}

// gqlFragments.js
// import gql from 'graphql-tag';

const myBroFragment = gql`
  fragment user on User {
    name
    createdAt
  }
`

export const USER_QUERY = gql`
  {
    user(id: 1) {
      ...user
    }
  }
  ${myBroFragment}
`

