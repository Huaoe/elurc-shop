import { config } from "dotenv"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: resolve(__dirname, ".env.local") })

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("DATABASE_URL value:", process.env.DATABASE_URL ? "✓ Set" : "✗ Not set")

if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL)
  console.log("Database host:", url.hostname)
  console.log("Database name:", url.pathname.slice(1))
}
