'use strict';

module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if(node.arguments.length > 0) {
                    const tokens = [node.callee, ...node.arguments];
                    if(allOnSameLine(tokens)) {
                        return;
                    }

                    if(!allOnSeparateLines(tokens)) {
                        context.report(
                            {
                                node: node,
                                message: 'Function call arguments need to be on the same line or each on their own'
                            }
                        );
                    }
                }
            }
        };
    }
};

function allOnSameLine(tokens) {
    if(!tokens || tokens.length === 0) {
        return true;
    } else {
        return tokens.filter( token => !onSameLine(tokens[0], token) ).length === 0;
    }
}

function allOnSeparateLines(tokens) {
    if(!tokens || tokens.length === 0) {
        return true;
    } else {
        return tokens.slice(1).filter( (token, index) => !onSeparateLines(tokens[index], token)).length === 0;
    }
}

function onSameLine(left, right) {
    return left.loc.end.line === right.loc.end.line;
}

function onSeparateLines(left, right) {
    return left.loc.end.line < right.loc.start.line;
}
