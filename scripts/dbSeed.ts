// To access your database
import { db } from '../api/src/lib/db'
import { seed } from '../api/db/seed'

export default async ({ args }) => {
  // Your script here...
  console.log('Seeding Database...')
  await seed()
  console.log('Database seed complete.')
}
