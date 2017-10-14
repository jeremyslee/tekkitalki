{
	"commands": ["declare a variable", "initialize a variable"],
	"commandString": "declare a variable, initialize a variable",
	"code": "let ??;",
	"fn": "let variable = self.state.commandVars.slice(-1)[0]; if (variable === undefined) variable = 'x'; let code = obj.code; code = code.replace('??', self.camelize(variable)); self.setState({ onPageCode: self.state.onPageCode.concat('<p>' + code + '</p>'), commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1), existingVars: self.state.existingVars.concat(self.camelize(variable)) });"
}

{
	"commands": ["console log", "console.log", "log out"],
	"commandString": "console log, console.log, log out",
	"code": "console.log(??);",
	"fn": "let code = obj.code; let variable = self.state.commandVars.slice(-1)[0]; if (variable === undefined) { variable = '' } else if (self.state.existingVars.indexOf(self.camelize(variable)) > -1) { variable = self.camelize(variable); } else { variable = '&#39;' + variable + '&#39;'; } code = code.replace('??', variable); self.setState({ onPageCode: self.state.onPageCode.concat('<p>' + code + '</p>'), commandVars: self.state.commandVars.slice(0, self.state.commandVars.length - 1) });"
}
