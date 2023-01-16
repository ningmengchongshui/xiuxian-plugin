import imgindex from '../img/index.js'
import Modifi from '../data/defset/modify.js'
import exec from '../exec/exex.js'
class botapi {
    showPuppeteer = async (parameter) => {
        return await imgindex.showPuppeteer(parameter)
    }
    readConfig = () => {
        return Modifi.Readconfig()
    }
    openConfig = () => {
        return Modifi.openReadconfig()
    }
    readConfigHelp = () => {
        return Modifi.readConfigHelp()
    }
    openConfigHelp = () => {
        return Modifi.openReadconfighelp()
    }
    addMaster = () => {
        return Modifi.addMaster()
    }
    deleteMaster = () => {
        return Modifi.deleteMaster()
    }
    offGroup = () => {
        return Modifi.offGroup()

    }
    onGroup = () => {
        return Modifi.onGroup()
    }
    exec = (parameter) => {
        return exec.start(parameter)
    }
}
export default new botapi()