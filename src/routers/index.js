const path = require('path')
const { readdirSync } = require('fs')

const { Router } = require('express')

const router = Router()

const isCompiled = path.extname(__filename) === '.js'
const thisFileName = path.basename(__filename)

const loadRoutes = async (dirPath, prefix = '/') => {
    readdirSync(dirPath, {
        withFileTypes: true,
    }).forEach(async (f) => {
        if (f.isFile()) {
            if (f.name == thisFileName) return
            const isRouteMod = f.name.endsWith(
                `.routes.${isCompiled ? 'js' : 'ts'}`
            )
            if (isRouteMod) {
                const route = f.name.replace(
                    `.routes.${isCompiled ? 'js' : 'ts'}`,
                    ''
                )
                const modRoute = path.join(prefix, route)
                console.log('🛰️  Loaded', modRoute)

                const mod = await import(path.join(baseDir, f.name))

                router.use(modRoute, mod.default)
                // router.use("/user",require("./user.routes.js"))
            }
        } else if (f.isDirectory()) {
            await loadRoutes(path.resolve(dirPath, f.name), prefix + f.name)
        }
    })
}

let baseDir = path.dirname(__filename)
baseDir = path.resolve(baseDir)

loadRoutes(baseDir)

module.exports = router
