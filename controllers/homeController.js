import { join } from 'path'


export const homeController = (req, res) => {
    res.sendFile(join(process.cwd(), 'public'))
}