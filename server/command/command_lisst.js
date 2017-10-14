{
	"commands": ["declare a variable", "initialize a variable"],
	"code": "let ??;",
	"fn": "let variable = self.state.commandVars.slice(-1)[0]; if (variable === undefined) variable = 'x'; let code = obj.code; code = code.replace('??', self.camelize(variable)); let arr = self.state.onPageCode; arr.splice(self.state.insertWhere - 1, 0, '<p>' + code + '</p>'); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1), existingVars: self.state.existingVars.concat(self.camelize(variable)) });"
}

{
	"commands": ["console log", "console.log", "log out"],
	"code": "console.log(??);",
	"fn": "let code = obj.code; let variable = self.state.commandVars.slice(-1)[0]; if (variable === undefined) { variable = '' } else if (self.state.existingVars.indexOf(self.camelize(variable)) > -1) { variable = self.camelize(variable); } else { variable = '&#39;' + variable + '&#39;'; } code = code.replace('??', variable); let arr = self.state.onPageCode; arr.splice(self.state.insertWhere - 1, 0, '<p>' + code + '</p>'); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1) });"
}

{
	"commands": ["insert a new line before line number", "insert a new line before line", "create a new line before line number", "create a new line before line"],
	"code": "EMPTY",
	"fn": "let lineNumber = parseInt(self.state.commandVars.slice(-1)[0]); if (isNaN(lineNumber)) lineNumber = parseInt(numWords[self.state.commandVars.slice(-1)[0]]); let arr = self.state.onPageCode; if (!isNaN(lineNumber)) arr.splice(lineNumber - 1, 0, '<p>&nbsp;</p>'); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1) });"
}

{
	"commands": ["insert a new line after line number", "insert a new line after line", "create a new line after line number", "create a new line after line"],
	"code": "EMPTY",
	"fn": "let lineNumber = parseInt(self.state.commandVars.slice(-1)[0]); if (isNaN(lineNumber)) lineNumber = parseInt(numWords[self.state.commandVars.slice(-1)[0]]); let arr = self.state.onPageCode; if (!isNaN(lineNumber)) arr.splice(lineNumber, 0, '<p>&nbsp;</p>'); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1) });"
}

{
	"commands": ["delete line number", "remove line number"],
	"code": "LINE DELETED",
	"fn": "let lineNumber = parseInt(self.state.commandVars.slice(-1)[0]); if (isNaN(lineNumber)) lineNumber = parseInt(numWords[self.state.commandVars.slice(-1)[0]]); let arr = self.state.onPageCode; arr.splice(lineNumber - 1, 1); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1) });"
}

{
	"commands": ["declare a function called", "create a function called", "define a function called"],
	"code": "function ??() {",
	"fn": "let funcName = self.state.commandVars.slice(-1)[0]; if (variable === undefined) variable = 'foo'; let code = obj.code; code = code.replace('??', self.camelize(funcName)); let arr = self.state.onPageCode; arr.splice(self.state.insertWhere - 1, 0, '<p>' + code + '</p>'); arr.splice(self.state.insertWhere, 0, '<p>&nbsp;</p>'); arr.splice(self.state.insertWhere + 1, 0, '<p>};</p>'); self.setState({ onPageCode: arr, commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1), existingVars: self.state.existingVars.concat(self.camelize(funcName)) });"
}
