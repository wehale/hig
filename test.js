 
// or, override the platform
const Say = require('say').Say
const say = new Say('darwin' || 'win32' || 'linux')
 
// Use default system voice and speed
say.speak('Hello!')
 