import fs from 'fs-extra'
import * as babylon from 'babylon'
import traverse from '@babel/traverse'
import globby from 'globby'
import * as types from './types'

export default async input => {
  const files = await globby(input)
  const res = await Promise.all(files.map(async file => {
    const code = await fs.readFile(file, 'utf8')
    const stats = detect(code)
    return { file, stats }
  }))
  console.log(res)
}

class Detective {
  constructor() {
    this.items = []
  }

  has(type) {
    return Boolean(this.items.find(item =>
      item.type === type || item.type.toLowerCase() === type
    ))
  }

  add(item) {
    this.items.push(item)
    return this
  }

  count(type) {
    return this.items.filter(item =>
      item.type === type || item.type.toLowerCase() === type
    ).length
  }
}

export function detect(code) {
  const detective = new Detective()
  const ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: [
      'dynamicImport',
      'objectRestSpread',
      'flow'
    ]
  })
  traverse(ast, {
    VariableDeclaration(path) {
      if (path.node.kind === 'const') {
        detective.add({ type: types.CONST, loc: path.node.loc })
      } else if (path.node.kind === 'let') {
        detective.add({ type: types.LET, loc: path.node.loc })
      }
    },
    TemplateLiteral(path) {
      detective.add({ type: types.TEMPLATE_LITERAL, loc: path.node.loc })
    },
    SpreadElement(path) {
      detective.add({ type: types.OBJECT_REST_SPREAD, loc: path.node.loc })
    },
    TaggedTemplateExpression(path) {
      detective.add({ type: types.TAGGED_TEMPLATE_LITERAL, loc: path.node.loc })
    },
    ClassDeclaration(path) {
      detective.add({ type: types.CLASS, loc: path.node.loc })
    },
    ArrowFunctionExpression(path) {
      detective.add({ type: types.ARROW_FUNCTION, loc: path.node.loc })
      if (path.node.async) {
        detective.add({ type: types.ASYNC, loc: path.node.loc })
      }
    },
    FunctionDeclaration(path) {
      if (path.node.async) {
        detective.add({ type: types.ASYNC, loc: path.node.loc })
      } else if (path.node.generator) {
        detective.add({ type: types.GENERATOR, loc: path.node.loc })
      }
    },
    ImportDeclaration(path) {
      detective.add({ type: types.ES_MODULE, loc: path.node.loc })
    },
    ExportNamedDeclaration(path) {
      detective.add({ type: types.ES_MODULE, loc: path.node.loc })
    },
    ExportDefaultDeclaration(path) {
      detective.add({ type: types.ES_MODULE, loc: path.node.loc })
    },
    CallExpression(path) {
      if (path.get('callee').type === 'Import') {
        detective.add({ type: types.DYNAMIC_IMPORT, loc: path.node.loc })
      }
    },
    ObjectPattern(path) {
      detective.add({ type: types.DESTRUCTURING, loc: path.node.loc })
    },
    ArrayPattern(path) {
      detective.add({ type: types.DESTRUCTURING, loc: path.node.loc })
    },
    ObjectMethod(path) {
      if (path.node.async) {
        detective.add({ type: types.ASYNC, loc: path.node.loc })
      } else if (path.node.generator) {
        detective.add({ type: types.GENERATOR, loc: path.node.loc })
      }
    },
    ForOfStatement(path) {
      detective.add({ type: types.FOR_OF, loc: path.node.loc })
    }
  })
  return detective
}

export { types }
