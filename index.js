function htmlStringToObject(htmlString) {
  htmlString = htmlString.replaceAll(/(\r|\n|\r\n)/gm, '')
  function parseAttributes(attrString) {
    const attrRegex = /(\w+)\s*=\s*("[^"]*"|'[^']*')/g;
    const attributes = {};

    let match;
    while ((match = attrRegex.exec(attrString)) !== null) {
      const attrName = match[1];
      const attrValue = match[2].slice(1, match[2].length - 1);

      if (attrName === 'style') {
        const styles = attrValue.split(';').filter(Boolean);
        const styleObj = {};

        styles.forEach(style => {
          const [property, value] = style.split(':').map(str => str.trim());
          styleObj[property] = value;
        });

        attributes[attrName] = styleObj;
      } else {
        attributes[attrName] = attrValue;
      }
    }

    return attributes;
  }

  function traverse(html) {
    let tagRegex = /(<(\w+)([^>]*)>|<\/(\w+)([^>]*)>)/;
    let curIndex = {
      children: []
    };
    const root = curIndex;
    const stack = [];

    let match = html.match(tagRegex)
    while( match ) {
      const [_, p1, p2, p3, p4, p5] = match
      offset = match.index
      if ( p2 ) {
        stack.push([p2, offset]);
        const newIndex = {
          parent: curIndex,
          tag: p2,
          text: undefined,
          ...parseAttributes(p3),
          children: []
        }
        curIndex.children.push(newIndex)
        curIndex = newIndex
        html = html.substring(0, offset) + html.substring(offset + p1.length)
      } else {
        if ( stack.length === 0 )
          throw 'Invalid html tag'
        const lastStartTag = stack.slice(-1)[0]
        if ( lastStartTag[0] === p4 ) {
          stack.pop();
          const tempIndex = curIndex
          const text = html.substring(lastStartTag[1], offset)
          if ( text )
            curIndex.text = text
          curIndex = curIndex.parent
          tempIndex.parent = undefined
          if ( tempIndex.children.length === 0 )
            tempIndex.children = undefined
          html = html.substring(0, lastStartTag[1]) + html.substring(offset + p1.length)
        }
      }
      match = html.match(/(<(\w+)([^>]*)>|<\/(\w+)([^>]*)>)/)
    }
    return root.children
  }

  let resObject = traverse(htmlString)
  return JSON.stringify(resObject, null, 2);
}

module.exports = {
  htmlStringToObject
}