import path from 'path'
import fs from 'fs'

export async function GET() {
  console.log('GET request received')

  const filePath = path.join(__dirname, '..', 'public', 'cv.pdf')
  const stat = await fs.promises.stat(filePath)

  const headers = new Headers()
  headers.append('Content-Type', 'application/pdf')
  headers.append('Content-Length', stat.size)
  headers.append('Content-Disposition', 'attachment; filename=Cv.pdf')

  return new Response(fs.createReadStream(filePath), {
    headers,
    status: 200,
  })
}
