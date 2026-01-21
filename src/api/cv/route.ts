import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function GET(): Promise<Response> {
  console.log('GET request received')

  const filePath = path.join(__dirname, '..', '..', '..', 'public', 'cv.pdf')
  const fileBuffer = await fs.promises.readFile(filePath)

  const headers = new Headers()
  headers.append('Content-Type', 'application/pdf')
  headers.append('Content-Length', fileBuffer.length.toString())
  headers.append('Content-Disposition', 'attachment; filename=Cv.pdf')

  return new Response(fileBuffer, {
    headers,
    status: 200,
  })
}
